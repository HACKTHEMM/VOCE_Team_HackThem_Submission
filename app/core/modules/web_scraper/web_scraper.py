import os
import requests
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv
import json
import time
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
from functools import partial
from app.helper.get_config import load_yaml

# Load .env file from the backend root directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '.env'))

class TravelDataSearcher:
    """
    Google SERP API integration optimized for Voce project to scrape travel data with multi-threading.
    """
    
    def __init__(self, serpapi_key: Optional[str] = None, max_workers: int = 5):
        self.serpapi_key = serpapi_key or os.getenv("SERPAPI_KEY")
        if not self.serpapi_key:
            try:
                self.serpapi_key = load_yaml('SERP_API_KEY')
            except:
                raise ValueError("SERPAPI_KEY is required. Get it from https://serpapi.com/")
        
        self.max_workers = max_workers
        self.thread_pool = ThreadPoolExecutor(max_workers=max_workers)
        self.results_lock = Lock()
        
        self.request_lock = Lock()
        self.last_request_time = 0
        self.min_request_interval = 0.1  # 100ms between requests
        
        # Travel-specific search keywords
        self.travel_keywords = [
            "things to do", "attractions", "restaurants", "local food", "events", "culture",
            "museums", "parks", "public transport", "safety tips", "hidden gems",
            "local experience", "authentic travel", "off the beaten path"
        ]

    def search_city_info(self, city: str, query: str = "", num_results: int = 15) -> Dict[str, Any]:
        """
        Search for travel-specific information for a given city using Google Search via SERP API.
        
        Args:
            city: The name of the city to search for.
            query: Specific travel query (e.g., "local food," "museums").
            num_results: Number of results to return.
            
        Returns:
            A dictionary containing comprehensive travel information for the city.
        """
        try:
            search_query = f"{query} in {city}" if query else f"travel guide for {city}"
            
            with self.request_lock:
                current_time = time.time()
                time_since_last = current_time - self.last_request_time
                if time_since_last < self.min_request_interval:
                    time.sleep(self.min_request_interval - time_since_last)
                
                params = {
                    "engine": "google",
                    "q": search_query,
                    "location": city,
                    "hl": "en",
                    "gl": "us",
                    "num": num_results,
                    "api_key": self.serpapi_key
                }
                
                # Use the correct import - either the legacy GoogleSearch or new serpapi
                try:
                    # Try the legacy google-search-results package
                    from serpapi import GoogleSearch
                    search = GoogleSearch(params)
                    results = search.get_dict()
                except ImportError:
                    try:
                        # Try the new serpapi package
                        import serpapi
                        results = serpapi.search(params)
                    except ImportError:
                        # If neither works, make a direct API call
                        results = self._make_direct_api_call(params)
                
                self.last_request_time = time.time()
            
            travel_data = self._process_travel_results(results, city, query)
            
            return {
                "success": True,
                "city": city,
                "query": query,
                "total_results": len(travel_data.get("results", [])),
                "travel_info": travel_data,
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "city": city,
                "query": query,
                "travel_info": {}
            }

    def _make_direct_api_call(self, params: Dict[str, Any]) -> Dict[str, Any]:
        """
        Make a direct API call to SerpApi if the packages are not available.
        
        Args:
            params: Search parameters
            
        Returns:
            API response as dictionary
        """
        try:
            # Remove the engine parameter for the URL
            api_params = params.copy()
            engine = api_params.pop("engine", "google")
            
            # Build the API URL
            base_url = f"https://serpapi.com/search.json"
            
            response = requests.get(base_url, params=api_params, timeout=30)
            response.raise_for_status()
            
            return response.json()
            
        except requests.RequestException as e:
            raise Exception(f"Direct API call failed: {str(e)}")

    def _process_travel_results(self, results: Dict[str, Any], city: str, query: str) -> Dict[str, Any]:
        """
        Process and categorize travel search results.
        
        Args:
            results: Raw SERP API results.
            city: The city being searched.
            query: The original search query.
            
        Returns:
            Processed and categorized travel information.
        """
        processed_data = {
            "results": [],
            "key_information": {
                "attractions": [],
                "dining": [],
                "events_culture": [],
                "practical_info": [], # Transport, safety, etc.
                "local_tips": [],
            },
            "summary_snippets": []
        }

        if "organic_results" not in results:
            return processed_data

        for item in results["organic_results"]:
            result_data = {
                "title": item.get("title", ""),
                "link": item.get("link", ""),
                "snippet": item.get("snippet", ""),
                "position": item.get("position", 0)
            }
            processed_data["results"].append(result_data)
            
            snippet = result_data["snippet"].lower()
            title = result_data["title"].lower()
            
            # Categorize information based on content
            if any(k in snippet or k in title for k in ["museum", "park", "attraction", "see", "visit", "landmark"]):
                processed_data["key_information"]["attractions"].append(result_data)
            
            if any(k in snippet or k in title for k in ["eat", "restaurant", "food", "cafe", "dining", "dish"]):
                processed_data["key_information"]["dining"].append(result_data)

            if any(k in snippet or k in title for k in ["event", "culture", "festival", "art", "music", "tradition"]):
                processed_data["key_information"]["events_culture"].append(result_data)
                
            if any(k in snippet or k in title for k in ["transport", "safety", "map", "metro", "bus", "airport"]):
                processed_data["key_information"]["practical_info"].append(result_data)

            if any(k in snippet or k in title for k in ["tip", "advice", "local", "secret", "hidden gem", "know before"]):
                processed_data["key_information"]["local_tips"].append(result_data)

            if result_data["snippet"]:
                processed_data["summary_snippets"].append(result_data["snippet"])
        
        return processed_data

    def get_specific_city_data(self, city: str, data_type: str = "attractions") -> Dict[str, Any]:
        """
        Get a specific category of travel data for a city.
        
        Args:
            city: The city of interest.
            data_type: Type of data (e.g., "attractions", "food", "safety").
            
        Returns:
            A dictionary containing the specific travel information.
        """
        query_map = {
            "attractions": f"top attractions and things to do in {city}",
            "food": f"best local food and restaurants in {city}",
            "events": f"events and cultural festivals in {city}",
            "safety": f"safety tips for tourists in {city}",
            "transport": f"public transportation guide for {city}",
        }
        
        query = query_map.get(data_type, f"{data_type} in {city}")
        return self.search_city_info(city, query, num_results=20)

    def multi_threaded_search(self, searches: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Perform multiple travel searches concurrently.
        
        Args:
            searches: A list of dictionaries, each with "city" and "query" keys.
            
        Returns:
            A dictionary containing all search results.
        """
        results = {}
        
        future_to_search = {
            self.thread_pool.submit(self.search_city_info, s["city"], s.get("query", "")): f"{s['city']}:{s.get('query', 'general')}" 
            for s in searches
        }
        
        for future in as_completed(future_to_search):
            search_key = future_to_search[future]
            try:
                result = future.result(timeout=30)
                with self.results_lock:
                    results[search_key] = result
            except Exception as e:
                with self.results_lock:
                    results[search_key] = {"success": False, "error": str(e), "search": search_key}
        
        return {"success": True, "results": results}

    def cleanup_thread_pool(self):
        """Clean up thread pool resources."""
        self.thread_pool.shutdown(wait=True)

    def __del__(self):
        """Destructor to ensure thread pool cleanup."""
        self.cleanup_thread_pool()

class TravelQueryProcessor:
    """
    Processes a traveler's natural language query to extract intent and entities.
    """
    def __init__(self):
        self.activity_keywords = ["see", "do", "eat", "go", "visit", "explore", "find", "is there", "are there"]
        self.intent_categories = {
            "discovery": ["what to do", "things to see", "attractions", "visit", "explore", "see", "sights"],
            "dining": ["eat", "food", "restaurant", "cafe", "cuisine", "dish", "drink"],
            "logistics": ["transport", "metro", "bus", "taxi", "get around", "airport", "station"],
            "culture": ["customs", "etiquette", "what to wear", "tradition", "local life"],
            "safety": ["safe", "safety", "danger", "police", "emergency", "advice"],
        }

    def extract_intent_and_location(self, query: str) -> Dict[str, Any]:
        """
        Analyzes a traveler's query to determine intent and the location.
        
        Args:
            query: The user's input query (e.g., "what is there to eat in Paris?").
            
        Returns:
            A dictionary with the extracted intent, location, and a cleaned query.
        """
        query_lower = query.lower().strip()
        
        # --- Intent Extraction ---
        primary_intent = "general"
        for intent, keywords in self.intent_categories.items():
            if any(keyword in query_lower for keyword in keywords):
                primary_intent = intent
                break
        
        # --- Location Extraction (Simple Regex) ---
        location = None
        match = re.search(r'\b(in|at|near|around)\s+([A-Z][a-zA-Z\s]+)', query, re.IGNORECASE)
        if match:
            location = match.group(2).strip()
        
        # --- Enhanced Query Generation ---
        cleaned_query = self._clean_query(query_lower, location)
        enhanced_query = f"{cleaned_query}" if location else query

        return {
            "original_query": query,
            "cleaned_query": cleaned_query,
            "enhanced_query_for_search": enhanced_query,
            "intent": primary_intent,
            "location": location,
        }
    
    def _clean_query(self, query: str, location: Optional[str]) -> str:
        """Removes conversational filler and location phrases."""
        query = query.replace("can you tell me", "").replace("i want to know", "")
        if location:
            query = re.sub(r'\b(in|at|near|around)\s+' + re.escape(location), '', query, flags=re.IGNORECASE)
        return query.strip()

# --- Main Integration Function for Voce ---
def get_travel_data_for_voce(query: str, serpapi_key: str = None, max_workers: int = 5) -> Dict[str, Any]:
    """
    Main integration function for the Voce language processor to get travel data.
    
    Args:
        query: The traveler's natural language query.
        serpapi_key: SERPAPI key (optional).
        max_workers: Number of concurrent threads.
        
    Returns:
        Comprehensive travel data optimized for answering the traveler's query.
    """
    try:
        searcher = TravelDataSearcher(serpapi_key, max_workers)
        processor = TravelQueryProcessor()
        
        # 1. Analyze the user's query
        analysis = processor.extract_intent_and_location(query)
        city = analysis.get("location")
        
        if not city:
            return {"success": False, "error": "Could not determine a location from the query.", "query": query}

        # 2. Perform searches based on the analyzed intent
        search_tasks = []
        # General search for the main query
        search_tasks.append(
            searcher.thread_pool.submit(searcher.search_city_info, city, analysis["cleaned_query"])
        )
        # Specific search based on intent
        search_tasks.append(
            searcher.thread_pool.submit(searcher.get_specific_city_data, city, analysis["intent"])
        )

        # 3. Collect and aggregate results
        aggregated_info = {
            "all_results": [],
            "key_information": {},
            "summary_snippets": []
        }
        
        for future in as_completed(search_tasks):
            result = future.result()
            if result.get("success"):
                info = result["travel_info"]
                aggregated_info["all_results"].extend(info.get("results", []))
                aggregated_info["summary_snippets"].extend(info.get("summary_snippets", []))
                for key, values in info.get("key_information", {}).items():
                    if key not in aggregated_info["key_information"]:
                        aggregated_info["key_information"][key] = []
                    aggregated_info["key_information"][key].extend(values)

        # 4. Clean up duplicates
        seen_urls = set()
        unique_results = []
        for res in aggregated_info["all_results"]:
            if res.get("link") not in seen_urls:
                unique_results.append(res)
                seen_urls.add(res.get("link"))
        aggregated_info["all_results"] = unique_results
        aggregated_info["summary_snippets"] = list(set(aggregated_info["summary_snippets"]))
        
        searcher.cleanup_thread_pool()

        return {
            "success": True,
            "query_analysis": analysis,
            "aggregated_data": aggregated_info,
        }
        
    except Exception as e:
        return {"success": False, "error": str(e), "query": query}