import os
import requests
from typing import List, Dict, Any, Optional
from serpapi.google_search import GoogleSearch
from dotenv import load_dotenv
import json
import time
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock
import asyncio
from functools import partial
from app.helper.get_config import load_yaml

# Load .env file from the backend root directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '..', '..', '..', '.env'))

class LenDenClubSearcher:
    """
    Google SERP API integration optimized for LenDenClub data scraping with multi-threading support
    """
    
    def __init__(self, serpapi_key: Optional[str] = None, max_workers: int = 5):
        self.serpapi_key = serpapi_key or os.getenv("SERPAPI_KEY")
        if not self.serpapi_key:
            try:
                self.serpapi_key = load_yaml('SERP_API_KEY')
            except:
                raise ValueError("SERPAPI_KEY is required. Get it from https://serpapi.com/")
        
        # Thread pool configuration
        self.max_workers = max_workers
        self.thread_pool = ThreadPoolExecutor(max_workers=max_workers)
        self.results_lock = Lock()
        
        # Rate limiting to avoid API abuse
        self.request_lock = Lock()
        self.last_request_time = 0
        self.min_request_interval = 0.1  # 100ms between requests
        
        # LenDenClub specific search queries and keywords
        self.lendenclub_keywords = [
            "lendenclub", "lenden club", "p2p lending", "peer to peer lending",
            "investment platform", "loan platform", "fintech", "lending",
            "borrowing", "interest rates", "investment returns"        ]
    def search_lendenclub_info(self, query: str = "", num_results: int = 15, location: str = "India") -> Dict[str, Any]:
        """
        Search for LenDenClub specific information using Google Search via SERP API
        
        Args:
            query: Specific query about LenDenClub (optional, will use default if empty)
            num_results: Number of results to return
            location: Location for search results
            
        Returns:
            Dictionary containing comprehensive LenDenClub information
        """
        try:
            # If no specific query provided, use comprehensive LenDenClub search
            if not query.strip():
                search_query = "LenDenClub peer-to-peer lending platform India investment returns interest rates"
            else:
                search_query = f"LenDenClub {query}"
            
            # Use rate-limited search to avoid API abuse
            with self.request_lock:
                current_time = time.time()
                time_since_last = current_time - self.last_request_time
                if time_since_last < self.min_request_interval:
                    time.sleep(self.min_request_interval - time_since_last)
                
                params = {
                    "engine": "google",
                    "q": search_query,
                    "location": location,
                    "hl": "en",
                    "gl": "in",
                    "num": num_results,
                    "api_key": self.serpapi_key
                }
                
                search = GoogleSearch(params)
                results = search.get_dict()
                self.last_request_time = time.time()
            
            # Extract and categorize LenDenClub information
            lendenclub_data = self._process_lendenclub_results(results, search_query)
            
            return {
                "success": True,
                "query": search_query,
                "original_query": query,
                "total_results": len(lendenclub_data.get("results", [])),
                "lendenclub_info": lendenclub_data,
                "search_metadata": {
                    "search_id": results.get("search_metadata", {}).get("id", ""),
                    "engine_used": "google",
                    "location": location,
                    "timestamp": time.time(),
                    "optimized_for": "lendenclub_language_processing"
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "query": query,
                "lendenclub_info": {}
            }
    
    def _process_lendenclub_results(self, results: Dict[str, Any], query: str) -> Dict[str, Any]:
        """
        Process and categorize LenDenClub search results for language processing
        
        Args:
            results: Raw SERP API results
            query: Original search query
            
        Returns:
            Processed and categorized LenDenClub information
        """
        processed_data = {
            "results": [],
            "key_information": {
                "platform_details": [],
                "investment_info": [],
                "interest_rates": [],
                "reviews_feedback": [],
                "regulatory_info": [],
                "contact_support": []
            },
            "summary_snippets": []
        }
        
        if "organic_results" in results:
            for item in results["organic_results"]:
                result_data = {
                    "title": item.get("title", ""),
                    "link": item.get("link", ""),
                    "snippet": item.get("snippet", ""),
                    "displayed_link": item.get("displayed_link", ""),
                    "position": item.get("position", 0)
                }
                
                processed_data["results"].append(result_data)
                
                # Categorize information based on content
                snippet_lower = result_data["snippet"].lower()
                title_lower = result_data["title"].lower()
                
                # Extract key information for language processing
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["platform", "about", "company", "founded"]):
                    processed_data["key_information"]["platform_details"].append(result_data)
                
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["investment", "invest", "returns", "portfolio"]):
                    processed_data["key_information"]["investment_info"].append(result_data)
                
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["interest", "rate", "yield", "percentage", "%"]):
                    processed_data["key_information"]["interest_rates"].append(result_data)
                
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["review", "feedback", "experience", "rating"]):
                    processed_data["key_information"]["reviews_feedback"].append(result_data)
                
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["rbi", "regulatory", "compliance", "regulation"]):
                    processed_data["key_information"]["regulatory_info"].append(result_data)
                
                if any(keyword in snippet_lower or keyword in title_lower 
                       for keyword in ["contact", "support", "help", "customer service"]):
                    processed_data["key_information"]["contact_support"].append(result_data)
                  # Collect important snippets for language processing
                if result_data["snippet"]:
                    processed_data["summary_snippets"].append(result_data["snippet"])
        
        return processed_data
    
    def search_general_web(self, query: str, num_results: int = 10, location: str = "India") -> Dict[str, Any]:
        """
        Enhanced general web search with LenDenClub context awareness
        
        Args:
            query: Search query
            num_results: Number of results to return
            location: Location for search results
            
        Returns:
            Dictionary containing search results optimized for language processing
        """
        try:
            # Enhance query if it seems related to LenDenClub
            enhanced_query = self._enhance_query_for_lendenclub(query)
            
            params = {
                "engine": "google",
                "q": enhanced_query,
                "location": location,
                "hl": "en",
                "gl": "in",
                "num": num_results,
                "api_key": self.serpapi_key
            }
            
            search = GoogleSearch(params)
            results = search.get_dict()
            
            # Extract and format web results with enhanced processing
            web_results = []
            if "organic_results" in results:
                for item in results["organic_results"]:
                    result = {
                        "title": item.get("title", ""),
                        "link": item.get("link", ""),
                        "snippet": item.get("snippet", ""),
                        "displayed_link": item.get("displayed_link", ""),
                        "position": item.get("position", 0),
                        "relevance_score": self._calculate_lendenclub_relevance(item),
                        "content_category": self._categorize_content(item)
                    }
                    web_results.append(result)
            
            # Sort by relevance for better language processing
            web_results.sort(key=lambda x: x["relevance_score"], reverse=True)
            
            return {
                "success": True,
                "query": enhanced_query,
                "original_query": query,
                "total_results": len(web_results),
                "results": web_results,
                "search_metadata": {
                    "search_id": results.get("search_metadata", {}).get("id", ""),
                    "engine_used": "google",
                    "location": location,
                    "timestamp": time.time(),
                    "optimized_for": "lendenclub_context"
                }
            }
            
        except Exception as e:            return {
                "success": False,
                "error": str(e),
                "query": query,
                "results": []
            }
    
    def get_lendenclub_specific_data(self, data_type: str = "comprehensive") -> Dict[str, Any]:
        """
        Get specific LenDenClub data for language processing
        
        Args:
            data_type: Type of data to retrieve (comprehensive, rates, reviews, etc.)
            
        Returns:
            Dictionary containing specific LenDenClub information
        """
        try:
            query_map = {
                "comprehensive": "LenDenClub peer-to-peer lending platform India complete information",
                "rates": "LenDenClub interest rates returns investment yield",
                "reviews": "LenDenClub reviews user experience feedback rating",
                "regulatory": "LenDenClub RBI compliance regulation NBFC",
                "contact": "LenDenClub customer support contact help",
                "comparison": "LenDenClub vs competitors P2P lending platforms India"
            }
            
            query = query_map.get(data_type, query_map["comprehensive"])
            return self.search_lendenclub_info(query, num_results=20)
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "data_type": data_type
            }
    
    def _enhance_query_for_lendenclub(self, query: str) -> str:
        """
        Enhance search query with LenDenClub context if relevant
        """
        query_lower = query.lower()
        
        # If query seems related to financial/lending topics, add LenDenClub context
        financial_keywords = ["loan", "lend", "invest", "interest", "p2p", "peer", "platform", "fintech"]
        
        if any(keyword in query_lower for keyword in financial_keywords):
            if "lendenclub" not in query_lower:
                return f"{query} LenDenClub context"
        
        return query
    
    def _calculate_lendenclub_relevance(self, item: Dict[str, Any]) -> float:
        """
        Calculate relevance score for LenDenClub context
        """
        title = item.get("title", "").lower()
        snippet = item.get("snippet", "").lower()
        link = item.get("link", "").lower()
        
        score = 0.0
        
        # High relevance for direct LenDenClub mentions
        if "lendenclub" in title or "lendenclub" in snippet or "lendenclub" in link:
            score += 1.0
        
        # Medium relevance for P2P lending terms
        p2p_terms = ["p2p", "peer to peer", "peer-to-peer", "lending platform", "investment platform"]
        for term in p2p_terms:
            if term in title or term in snippet:
                score += 0.5
        
        # Lower relevance for general financial terms
        financial_terms = ["investment", "loan", "lending", "interest rate", "fintech"]
        for term in financial_terms:
            if term in title or term in snippet:
                score += 0.2
        
        return min(score, 2.0)  # Cap at 2.0
    
    def multi_threaded_search(self, queries: List[str], num_results: int = 10, location: str = "India") -> Dict[str, Any]:
        """
        Perform multiple searches concurrently using thread pool
        
        Args:
            queries: List of search queries to execute
            num_results: Number of results per query
            location: Location for search results
            
        Returns:
            Dictionary containing all search results
        """
        try:
            results = {}
            search_tasks = []
            
            # Create partial function for thread pool execution
            search_func = partial(self._single_search_task, num_results=num_results, location=location)
            
            # Submit all search tasks to thread pool
            future_to_query = {
                self.thread_pool.submit(search_func, query): query 
                for query in queries
            }
            
            # Collect results as they complete
            for future in as_completed(future_to_query):
                query = future_to_query[future]
                try:
                    result = future.result(timeout=30)  # 30 second timeout per search
                    with self.results_lock:
                        results[query] = result
                except Exception as e:
                    with self.results_lock:
                        results[query] = {
                            "success": False,
                            "error": str(e),
                            "query": query
                        }
            
            return {
                "success": True,
                "total_queries": len(queries),
                "completed_searches": len(results),
                "results": results,
                "search_metadata": {
                    "timestamp": time.time(),
                    "method": "multi_threaded",
                    "max_workers": self.max_workers
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "queries": queries
            }
    
    def _single_search_task(self, query: str, num_results: int = 10, location: str = "India") -> Dict[str, Any]:
        """
        Single search task for thread pool execution
        
        Args:
            query: Search query
            num_results: Number of results
            location: Search location
            
        Returns:
            Search results dictionary
        """
        try:
            # Check if query is LenDenClub specific
            if any(keyword in query.lower() for keyword in self.lendenclub_keywords):
                return self.search_lendenclub_info(query, num_results, location)
            else:
                return self.search_general_web(query, num_results, location)
                
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "query": query
            }
    
    def batch_lendenclub_search(self, search_categories: List[str] = None) -> Dict[str, Any]:
        """
        Perform batch LenDenClub searches across multiple categories concurrently
        
        Args:
            search_categories: List of search categories (defaults to all major categories)
            
        Returns:
            Comprehensive LenDenClub data from multiple search categories
        """
        try:
            if not search_categories:
                search_categories = ["comprehensive", "rates", "reviews", "regulatory", "contact", "comparison"]
            
            # Create search queries for each category
            category_queries = []
            for category in search_categories:
                query_data = self._get_category_query(category)
                category_queries.append({
                    "category": category,
                    "query": query_data["query"],
                    "num_results": query_data.get("num_results", 15)
                })
            
            # Execute searches concurrently
            future_to_category = {}
            for query_data in category_queries:
                future = self.thread_pool.submit(
                    self.search_lendenclub_info,
                    query_data["query"],
                    query_data["num_results"]
                )
                future_to_category[future] = query_data["category"]
            
            # Collect results
            category_results = {}
            for future in as_completed(future_to_category):
                category = future_to_category[future]
                try:
                    result = future.result(timeout=45)  # 45 second timeout
                    with self.results_lock:
                        category_results[category] = result
                except Exception as e:
                    with self.results_lock:
                        category_results[category] = {
                            "success": False,
                            "error": str(e),
                            "category": category
                        }
            
            # Aggregate and process results
            aggregated_data = self._aggregate_batch_results(category_results)
            
            return {
                "success": True,
                "batch_search": True,
                "categories_searched": search_categories,
                "total_categories": len(search_categories),
                "completed_categories": len([r for r in category_results.values() if r.get("success", False)]),
                "aggregated_data": aggregated_data,
                "category_results": category_results,
                "search_metadata": {
                    "timestamp": time.time(),
                    "method": "batch_lendenclub_search",
                    "max_workers": self.max_workers
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "categories": search_categories
            }
    
    def parallel_query_processing(self, queries: List[str]) -> Dict[str, Any]:
        """
        Process multiple user queries in parallel with intent analysis
        
        Args:
            queries: List of user queries to process
            
        Returns:
            Dictionary containing processed results for all queries
        """
        try:
            processor = LenDenClubQueryProcessor()
            
            # Process query intents in parallel
            intent_futures = {
                self.thread_pool.submit(processor.extract_search_intent, query): query 
                for query in queries
            }
            
            query_intents = {}
            for future in as_completed(intent_futures):
                query = intent_futures[future]
                try:
                    intent_data = future.result(timeout=10)
                    query_intents[query] = intent_data
                except Exception as e:
                    query_intents[query] = {"error": str(e)}
            
            # Execute enhanced searches based on intents
            search_futures = {}
            for query, intent_data in query_intents.items():
                if "error" not in intent_data:
                    enhanced_query = intent_data.get("enhanced_query", query)
                    future = self.thread_pool.submit(
                        self.search_lendenclub_info,
                        enhanced_query,
                        15
                    )
                    search_futures[future] = {
                        "original_query": query,
                        "enhanced_query": enhanced_query,
                        "intent_data": intent_data
                    }
            
            # Collect search results
            processed_results = {}
            for future in as_completed(search_futures):
                query_info = search_futures[future]
                try:
                    search_result = future.result(timeout=30)
                    processed_results[query_info["original_query"]] = {
                        "intent_analysis": query_info["intent_data"],
                        "search_results": search_result,
                        "enhanced_query": query_info["enhanced_query"],
                        "status": "success"
                    }
                except Exception as e:
                    processed_results[query_info["original_query"]] = {
                        "intent_analysis": query_info.get("intent_data", {}),
                        "error": str(e),
                        "enhanced_query": query_info["enhanced_query"],
                        "status": "failed"
                    }
            
            return {
                "success": True,
                "total_queries": len(queries),
                "processed_queries": len(processed_results),
                "results": processed_results,
                "processing_metadata": {
                    "timestamp": time.time(),
                    "method": "parallel_query_processing",
                    "max_workers": self.max_workers
                }
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "queries": queries
            }
    
    def cleanup_thread_pool(self):
        """
        Cleanup thread pool resources
        """
        try:
            self.thread_pool.shutdown(wait=True)
        except Exception as e:
            print(f"Error during thread pool cleanup: {e}")
    
    def __del__(self):
        """
        Destructor to ensure thread pool cleanup
        """
        self.cleanup_thread_pool()
    
    def _categorize_content(self, item: Dict[str, Any]) -> str:
        """
        Categorize content for better language processing
        """
        title = item.get("title", "").lower()
        snippet = item.get("snippet", "").lower()
        
        if any(term in title or term in snippet for term in ["review", "feedback", "experience"]):
            return "review"
        elif any(term in title or term in snippet for term in ["rate", "interest", "return", "yield"]):
            return "financial_data"
        elif any(term in title or term in snippet for term in ["how to", "guide", "tutorial"]):
            return "educational"
        elif any(term in title or term in snippet for term in ["news", "update", "announcement"]):
            return "news"
        elif any(term in title or term in snippet for term in ["contact", "support", "help"]):
            return "support"
        else:
            return "general"
    
    def _get_category_query(self, category: str) -> Dict[str, Any]:
        """
        Get optimized query for specific search category
        """
        category_queries = {
            "comprehensive": {
                "query": "LenDenClub peer-to-peer lending platform India complete information overview",
                "num_results": 20
            },
            "rates": {
                "query": "LenDenClub interest rates returns investment yield current rates",
                "num_results": 15
            },
            "reviews": {
                "query": "LenDenClub reviews user experience feedback customer rating testimonials",
                "num_results": 15
            },
            "regulatory": {
                "query": "LenDenClub RBI compliance regulation NBFC license regulatory approval",
                "num_results": 10
            },
            "contact": {
                "query": "LenDenClub customer support contact help phone email address",
                "num_results": 10
            },
            "comparison": {
                "query": "LenDenClub vs competitors P2P lending platforms India comparison",
                "num_results": 15
            },
            "process": {
                "query": "LenDenClub investment process how to invest steps procedure",
                "num_results": 15
            },
            "features": {
                "query": "LenDenClub features benefits auto-invest portfolio diversification",
                "num_results": 12
            }
        }
        
        return category_queries.get(category, {
            "query": f"LenDenClub {category}",
            "num_results": 10
        })
    
    def _aggregate_batch_results(self, category_results: Dict[str, Any]) -> Dict[str, Any]:
        """
        Aggregate results from multiple category searches
        """
        aggregated = {
            "all_results": [],
            "key_information": {
                "platform_details": [],
                "investment_info": [],
                "interest_rates": [],
                "reviews_feedback": [],
                "regulatory_info": [],
                "contact_support": []
            },
            "summary_snippets": [],
            "category_summaries": {}
        }
        
        for category, result in category_results.items():
            if result.get("success", False) and "lendenclub_info" in result:
                info = result["lendenclub_info"]
                
                # Aggregate results
                if "results" in info:
                    aggregated["all_results"].extend(info["results"])
                
                # Aggregate key information
                if "key_information" in info:
                    for key, values in info["key_information"].items():
                        if key in aggregated["key_information"]:
                            aggregated["key_information"][key].extend(values)
                
                # Aggregate snippets
                if "summary_snippets" in info:
                    aggregated["summary_snippets"].extend(info["summary_snippets"])
                
                # Create category summary
                aggregated["category_summaries"][category] = {
                    "total_results": len(info.get("results", [])),
                    "key_points": info.get("summary_snippets", [])[:3],  # Top 3 snippets
                    "status": "success"
                }
            else:
                aggregated["category_summaries"][category] = {
                    "total_results": 0,
                    "error": result.get("error", "Unknown error"),
                    "status": "failed"
                }
        
        # Remove duplicates and limit results
        aggregated["all_results"] = self._remove_duplicate_results(aggregated["all_results"])
        aggregated["summary_snippets"] = list(set(aggregated["summary_snippets"]))[:20]  # Top 20 unique snippets
        
        return aggregated
    
    def _remove_duplicate_results(self, results: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Remove duplicate search results based on URL
        """
        seen_urls = set()
        unique_results = []
        
        for result in results:
            url = result.get("link", "")
            if url and url not in seen_urls:
                seen_urls.add(url)
                unique_results.append(result)
        
        # Sort by position and relevance
        unique_results.sort(key=lambda x: (x.get("position", 999), -x.get("relevance_score", 0)))
        return unique_results

class LenDenClubQueryProcessor:
    """
    Process user queries optimized for LenDenClub context and financial services
    """
    def __init__(self):
        # LenDenClub specific keywords
        self.lendenclub_keywords = [
            "lendenclub", "lenden club", "ldc", "lending", "borrowing", 
            "p2p", "peer to peer", "peer-to-peer", "investment", "loan"
        ]
        
        # Financial services keywords
        self.financial_keywords = [
            "interest rate", "returns", "yield", "investment", "portfolio",
            "risk", "credit score", "emi", "tenure", "principal", "maturity",
            "nbfc", "rbi", "regulatory", "compliance", "fintech"
        ]
        
        # Intent categories for better language processing
        self.intent_categories = {
            "information": ["what is", "tell me about", "explain", "describe", "info"],
            "rates": ["interest rate", "returns", "yield", "percentage", "rate"],
            "process": ["how to", "process", "steps", "procedure", "apply"],
            "comparison": ["vs", "compare", "better", "difference", "alternative"],
            "support": ["contact", "support", "help", "customer service", "problem"],
            "reviews": ["review", "feedback", "experience", "rating", "opinion"]        }
    
    def extract_search_intent(self, query: str) -> Dict[str, Any]:
        """
        Analyze user query to determine LenDenClub-specific search intent
        
        Args:
            query: User's input query
            
        Returns:
            Dictionary containing enhanced search intent for language processing
        """        
        query_lower = query.lower()
        
        # Check for direct LenDenClub mentions
        is_lendenclub_specific = any(keyword in query_lower for keyword in self.lendenclub_keywords)
        
        # Check for financial services intent
        is_financial_query = any(keyword in query_lower for keyword in self.financial_keywords)
        
        # Determine primary intent category
        primary_intent = "general"
        intent_confidence = 0.5
        
        for category, keywords in self.intent_categories.items():
            if any(keyword in query_lower for keyword in keywords):
                primary_intent = category
                intent_confidence = 0.9 if is_lendenclub_specific else 0.7
                break
        
        # Extract and clean the query for better processing
        processed_query = self._clean_query_for_processing(query)
        
        # Generate context-aware search query
        enhanced_query = self._generate_enhanced_query(query, primary_intent, is_lendenclub_specific)
        
        return {
            "original_query": query,
            "processed_query": processed_query,
            "enhanced_query": enhanced_query,
            "is_lendenclub_specific": is_lendenclub_specific,
            "is_financial_query": is_financial_query,
            "primary_intent": primary_intent,
            "intent_confidence": intent_confidence,
            "suggested_data_type": self._suggest_data_type(primary_intent),
            "language_processing_hints": {
                "focus_areas": self._extract_focus_areas(query_lower),
                "expected_response_type": self._determine_response_type(primary_intent),
                "context_priority": "lendenclub" if is_lendenclub_specific else "financial"
            }
        }
    
    def _clean_query_for_processing(self, query: str) -> str:
        """
        Clean and normalize query for better processing
        """
        # Remove common conversational phrases
        cleaning_phrases = [
            "can you tell me", "i want to know", "what is", "how does",
            "please explain", "help me understand", "i need information about"
        ]
        
        cleaned_query = query.lower().strip()
        for phrase in cleaning_phrases:
            if phrase in cleaned_query:
                cleaned_query = cleaned_query.replace(phrase, "").strip()
        
        return cleaned_query if cleaned_query else query.strip()
    
    def _generate_enhanced_query(self, query: str, intent: str, is_lendenclub: bool) -> str:
        """
        Generate enhanced search query for better results
        """
        base_query = query
        
        if not is_lendenclub and intent in ["rates", "process", "information"]:
            base_query = f"LenDenClub {query}"
        
        # Add context based on intent
        context_map = {
            "rates": "interest rates returns investment",
            "process": "how to process steps procedure",
            "comparison": "vs competitors alternatives",
            "support": "customer support contact help",
            "reviews": "reviews user experience feedback"
        }
        
        if intent in context_map and intent not in query.lower():
            base_query += f" {context_map[intent]}"
        
        return base_query
    
    def _suggest_data_type(self, intent: str) -> str:
        """
        Suggest appropriate data type for LenDenClub searcher
        """
        intent_to_data_type = {
            "rates": "rates",
            "reviews": "reviews",
            "support": "contact",
            "comparison": "comparison",
            "information": "comprehensive"
        }
        
        return intent_to_data_type.get(intent, "comprehensive")
    
    def _extract_focus_areas(self, query_lower: str) -> List[str]:
        """
        Extract key focus areas for language processing
        """
        focus_areas = []
        
        focus_keywords = {
            "rates": ["rate", "interest", "return", "yield", "percentage"],
            "process": ["process", "step", "how", "procedure", "apply"],
            "risk": ["risk", "safe", "secure", "guarantee", "protection"],
            "eligibility": ["eligible", "qualify", "criteria", "requirement"],
            "documents": ["document", "paper", "proof", "verification"],
            "timeline": ["time", "duration", "when", "how long", "period"]
        }
        
        for area, keywords in focus_keywords.items():
            if any(keyword in query_lower for keyword in keywords):
                focus_areas.append(area)
        
        return focus_areas if focus_areas else ["general"]
    
    def _determine_response_type(self, intent: str) -> str:
        """
        Determine expected response type for language processing optimization
        """
        response_types = {
            "rates": "numerical_data",
            "process": "step_by_step",
            "comparison": "comparative_analysis",
            "support": "contact_information",
            "reviews": "user_feedback",
            "information": "comprehensive_overview"
        }
        
        return response_types.get(intent, "informational")

# Multi-threaded integration functions for language processor
def get_comprehensive_lendenclub_data_mt(queries: List[str] = None, serpapi_key: str = None, max_workers: int = 5) -> Dict[str, Any]:
    """
    Multi-threaded comprehensive LenDenClub data retrieval for language processing
    
    Args:
        queries: List of specific queries (optional, will use default comprehensive search if not provided)
        serpapi_key: SERPAPI key (optional, will use env var if not provided)
        max_workers: Maximum number of concurrent threads
        
    Returns:
        Comprehensive LenDenClub data from multiple concurrent searches
    """
    try:
        # Initialize components with multi-threading support
        searcher = LenDenClubSearcher(serpapi_key, max_workers)
        processor = LenDenClubQueryProcessor()
        
        if queries and len(queries) > 1:
            # Multi-query processing
            result = searcher.parallel_query_processing(queries)
            
            # Enhance with batch search data
            batch_result = searcher.batch_lendenclub_search()
            if batch_result.get("success", False):
                result["batch_data"] = batch_result["aggregated_data"]
            
        elif queries and len(queries) == 1:
            # Single query with comprehensive batch search
            intent_data = processor.extract_search_intent(queries[0])
            primary_result = searcher.search_lendenclub_info(intent_data["enhanced_query"])
            
            # Get comprehensive batch data
            batch_result = searcher.batch_lendenclub_search()
            
            result = {
                "success": True,
                "primary_query": queries[0],
                "intent_analysis": intent_data,
                "primary_results": primary_result,
                "batch_data": batch_result.get("aggregated_data", {}),
                "processing_metadata": {
                    "method": "single_query_with_batch",
                    "timestamp": time.time()
                }
            }
        else:
            # Comprehensive batch search only
            result = searcher.batch_lendenclub_search()
            result["method"] = "comprehensive_batch_only"
        
        # Cleanup resources
        searcher.cleanup_thread_pool()
        
        return result
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "queries": queries,
            "fallback_data": {
                "message": "Multi-threaded search failed. Please try again or contact support.",
                "suggestions": ["Check internet connection", "Verify SERPAPI key", "Reduce number of concurrent queries"]
            }
        }

def get_parallel_lendenclub_searches(search_categories: List[str] = None, serpapi_key: str = None, max_workers: int = 8) -> Dict[str, Any]:
    """
    Execute multiple LenDenClub search categories in parallel
    
    Args:
        search_categories: List of search categories to execute
        serpapi_key: SERPAPI key (optional)
        max_workers: Maximum concurrent threads
        
    Returns:
        Results from parallel category searches
    """
    try:
        searcher = LenDenClubSearcher(serpapi_key, max_workers)
        
        if not search_categories:
            search_categories = ["comprehensive", "rates", "reviews", "regulatory", "contact", "comparison", "process", "features"]
        
        # Execute batch search with all categories
        result = searcher.batch_lendenclub_search(search_categories)
        
        # Cleanup
        searcher.cleanup_thread_pool()
        
        return result
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "categories": search_categories
        }

def multi_query_lendenclub_search(queries: List[str], serpapi_key: str = None, max_workers: int = 6) -> Dict[str, Any]:
    """
    Process multiple different queries about LenDenClub concurrently
    
    Args:
        queries: List of different search queries
        serpapi_key: SERPAPI key (optional)
        max_workers: Maximum concurrent threads
        
    Returns:
        Results from multiple concurrent searches
    """
    try:
        searcher = LenDenClubSearcher(serpapi_key, max_workers)
        
        # Execute multi-threaded search
        result = searcher.multi_threaded_search(queries)
        
        # Cleanup
        searcher.cleanup_thread_pool()
        
        return result
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "queries": queries
        }

# Enhanced main integration function with multi-threading
def get_lendenclub_data_for_language_processing_mt(query: str = "", serpapi_key: str = None, use_multithreading: bool = True, max_workers: int = 5) -> Dict[str, Any]:
    """
    Enhanced multi-threaded version of the main integration function for language processors
    
    Args:
        query: User query (optional)
        serpapi_key: SERPAPI key (optional, will use env var if not provided)
        use_multithreading: Whether to use multi-threading (default: True)
        max_workers: Maximum number of concurrent threads
        
    Returns:
        Comprehensive LenDenClub data optimized for language processing
    """
    try:
        if use_multithreading:
            # Use multi-threaded approach
            if query:
                queries = [query]
                return get_comprehensive_lendenclub_data_mt(queries, serpapi_key, max_workers)
            else:
                # Comprehensive multi-threaded search
                return get_parallel_lendenclub_searches(None, serpapi_key, max_workers)
        else:
            # Fall back to single-threaded original function
            return get_lendenclub_data_for_language_processing(query, serpapi_key)
            
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "query": query,
            "fallback_data": {
                "message": "Multi-threaded search failed. Falling back to single-threaded approach.",
                "suggestions": ["Try single-threaded search", "Check system resources", "Reduce max_workers"]
            }
        }

# Integration functions for language processor
def get_lendenclub_data_for_language_processing(query: str = "", serpapi_key: str = None) -> Dict[str, Any]:
    """
    Main integration function for language processors to get LenDenClub data
    
    Args:
        query: User query (optional)
        serpapi_key: SERPAPI key (optional, will use env var if not provided)
        
    Returns:
        Comprehensive LenDenClub data optimized for language processing
    """
    try:
        # Initialize components
        searcher = LenDenClubSearcher(serpapi_key)
        processor = LenDenClubQueryProcessor()
        
        # Process query intent
        if query:
            intent_data = processor.extract_search_intent(query)
            search_query = intent_data["enhanced_query"]
            data_type = intent_data["suggested_data_type"]
        else:
            search_query = ""
            data_type = "comprehensive"
            intent_data = {"primary_intent": "general", "language_processing_hints": {}}
        
        # Get LenDenClub data
        lendenclub_data = searcher.search_lendenclub_info(search_query)
        
        # Get specific data if needed
        if data_type != "comprehensive":
            specific_data = searcher.get_lendenclub_specific_data(data_type)
            lendenclub_data["additional_data"] = specific_data
        
        # Prepare data for language processing
        processed_response = {
            "success": lendenclub_data["success"],
            "query_analysis": intent_data,
            "search_results": lendenclub_data.get("lendenclub_info", {}),
            "language_processing_ready": {
                "primary_content": _extract_primary_content(lendenclub_data),
                "categorized_info": _categorize_for_language_model(lendenclub_data),
                "context_hints": intent_data.get("language_processing_hints", {}),
                "response_suggestions": _generate_response_suggestions(intent_data)
            },
            "metadata": {
                "total_sources": lendenclub_data.get("total_results", 0),
                "search_timestamp": lendenclub_data.get("search_metadata", {}).get("timestamp", time.time()),
                "optimized_for": "lendenclub_language_processing"
            }
        }
        
        return processed_response
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "query": query,
            "fallback_data": {
                "message": "Unable to fetch LenDenClub data. Please try again or contact support.",
                "suggestions": ["Check internet connection", "Verify SERPAPI key", "Try simplified query"]
            }
        }

def _extract_primary_content(data: Dict[str, Any]) -> List[str]:
    """
    Extract primary content snippets for language processing
    """
    content = []
    
    if "lendenclub_info" in data and "summary_snippets" in data["lendenclub_info"]:
        content.extend(data["lendenclub_info"]["summary_snippets"][:5])  # Top 5 most relevant
    
    return content

def _categorize_for_language_model(data: Dict[str, Any]) -> Dict[str, List[str]]:
    """
    Categorize information for better language model processing
    """
    categorized = {
        "key_facts": [],
        "financial_data": [],
        "user_experiences": [],
        "procedural_info": [],
        "contact_support": []
    }
    
    if "lendenclub_info" in data:
        info = data["lendenclub_info"]
        
        # Extract key information by category
        for category, results in info.get("key_information", {}).items():
            for result in results[:3]:  # Top 3 per category
                snippet = result.get("snippet", "")
                if snippet:
                    if "investment" in category or "rates" in category:
                        categorized["financial_data"].append(snippet)
                    elif "review" in category:
                        categorized["user_experiences"].append(snippet)
                    elif "platform" in category:
                        categorized["key_facts"].append(snippet)
                    elif "contact" in category:
                        categorized["contact_support"].append(snippet)
                    else:
                        categorized["procedural_info"].append(snippet)
    
    return categorized

def _generate_response_suggestions(intent_data: Dict[str, Any]) -> List[str]:
    """
    Generate response suggestions based on user intent
    """
    intent = intent_data.get("primary_intent", "general")
    
    suggestions_map = {
        "rates": [
            "Provide current interest rates and returns",
            "Compare with traditional investment options",
            "Explain rate calculation methodology"
        ],
        "process": [
            "Break down the step-by-step process",
            "Highlight required documents",
            "Mention timeline expectations"
        ],
        "reviews": [
            "Summarize user experiences",
            "Highlight common pros and cons",
            "Provide balanced perspective"
        ],
        "support": [
            "Provide contact information",
            "List available support channels",
            "Suggest common solutions"
        ],
        "comparison": [
            "Compare with competitors",
            "Highlight unique features",
            "Provide decision factors"
        ]
    }
    
    return suggestions_map.get(intent, [
        "Provide comprehensive overview",
        "Include relevant contact information",
        "Suggest next steps for user"
    ])

# Backward compatibility alias
ProductSearcher = LenDenClubSearcher
QueryProcessor = LenDenClubQueryProcessor
