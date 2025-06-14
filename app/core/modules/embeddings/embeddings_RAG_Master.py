import time
import json
import glob
import chromadb
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import os
from typing import List, Optional, Tuple, Dict, Any
from abc import ABC, abstractmethod
import whisper
import librosa
import numpy as np

load_dotenv()


class EmbeddingModel:
    """Handles embedding model operations"""
    
    def __init__(self, model_name: str = 'jinaai/jina-embeddings-v3'):
        """Initialize the embedding model
        
        Args:
            model_name: Name of the sentence transformer model to use
        """
        self.model_name = model_name
        self.model = None
        
    def load_model(self) -> bool:
        """Load the embedding model
        
        Returns:
            bool: True if model loaded successfully, False otherwise
        """
        try:
            print(f"Loading embedding model: {self.model_name}...")
            self.model = SentenceTransformer(self.model_name, trust_remote_code=True)
            print("Model loaded successfully!")
            return True
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            return False
    
    def generate_embedding(self, text: str) -> Optional[List[float]]:
        """Generate embedding for a single text
        
        Args:
            text: Text to generate embedding for
            
        Returns:
            List of floats representing the embedding, or None if error
        """
        if not self.model:
            raise ValueError("Model not loaded. Call load_model() first.")
            
        try:
            embedding = self.model.encode(str(text), convert_to_tensor=False).tolist()
            return embedding if embedding else None
        except Exception as e:
            print(f"Error generating embedding: {str(e)}")
            return None
    
    def generate_embeddings_batch(self, texts: List[str]) -> List[Optional[List[float]]]:
        """Generate embeddings for a batch of texts
        
        Args:
            texts: List of texts to generate embeddings for
            
        Returns:
            List of embeddings (or None for failed ones)
        """
        if not self.model:
            raise ValueError("Model not loaded. Call load_model() first.")
            
        embeddings = []
        for text in texts:
            embedding = self.generate_embedding(text)
            embeddings.append(embedding)
        return embeddings


class ChromaDBManager:
    """Manages ChromaDB operations"""
    
    def __init__(self, persist_directory: str = "chromadb_storage"):
        """Initialize ChromaDB manager
        
        Args:
            persist_directory: Directory to store ChromaDB data
        """
        self.persist_directory = persist_directory
        self.client = None
        self.collection = None
        
    def initialize_client(self) -> bool:
        """Initialize the ChromaDB client
        
        Returns:
            bool: True if client initialized successfully, False otherwise
        """
        try:
            self.client = chromadb.PersistentClient(path=self.persist_directory)
            print(f"ChromaDB client initialized with storage: {self.persist_directory}")
            return True
        except Exception as e:
            print(f"Error initializing ChromaDB client: {str(e)}")
            return False
    
    def get_or_create_collection(self, collection_name: str):
        """Get existing collection or create new one
        
        Args:
            collection_name: Name of the collection
            
        Returns:
            ChromaDB collection object
        """
        if not self.client:
            raise ValueError("Client not initialized. Call initialize_client() first.")
            
        try:
            self.collection = self.client.get_collection(name=collection_name)
            print(f"Using existing collection: {collection_name}")
        except:
            self.collection = self.client.create_collection(name=collection_name)
            print(f"Created new collection: {collection_name}")
            
        return self.collection
    
    def add_embeddings(self, documents: List[str], embeddings: List[List[float]], 
                      ids: List[str]) -> bool:
        """Add embeddings to the collection
        
        Args:
            documents: List of document texts
            embeddings: List of embedding vectors
            ids: List of document IDs
            
        Returns:
            bool: True if successful, False otherwise
        """
        if not self.collection:
            raise ValueError("Collection not initialized. Call get_or_create_collection() first.")
            
        try:
            print(f"Storing {len(embeddings)} embeddings in ChromaDB...")
            self.collection.add(
                documents=documents,
                embeddings=embeddings,
                ids=ids
            )
            print(f"Successfully stored {len(embeddings)} embeddings")
            return True
        except Exception as e:
            print(f"Error storing embeddings: {str(e)}")
            return False
    
    def get_collection_count(self) -> int:
        """Get the number of items in the collection
        
        Returns:
            Number of items in collection
        """
        if not self.collection:
            raise ValueError("Collection not initialized.")
            
        return self.collection.count()


class JSONProcessor:
    """Handles JSON transcript file processing operations"""
    
    def __init__(self, transcripts_directory: str = "Masked Transcripts(212)"):
        """Initialize JSON processor
        
        Args:
            transcripts_directory: Path to the directory containing JSON transcript files
        """
        self.transcripts_directory = transcripts_directory
        self.transcript_data = []
        
    def load_json_files(self) -> bool:
        """Load all JSON transcript files from the directory structure
        
        Returns:
            bool: True if loaded successfully, False otherwise
        """
        try:
            # Find all JSON files in subdirectories
            json_pattern = os.path.join(self.transcripts_directory, "*", "*.json")
            json_files = glob.glob(json_pattern)
            
            if not json_files:
                print(f"No JSON files found in {json_pattern}")
                return False
                
            print(f"Found {len(json_files)} JSON transcript files")
            
            # Load and process each JSON file
            for json_file in json_files:
                try:
                    with open(json_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        
                    # Extract segments from the JSON structure
                    if 'segments' in data:
                        for segment in data['segments']:
                            self.transcript_data.append({
                                'text': segment.get('text', ''),
                                'start': segment.get('start', 0),
                                'end': segment.get('end', 0),
                                'speaker_id': segment.get('speaker_id', 'unknown'),
                                'file_path': json_file
                            })
                    
                except Exception as e:
                    print(f"Error loading {json_file}: {str(e)}")
                    continue
            
            print(f"Successfully loaded {len(self.transcript_data)} transcript segments")
            return True
            
        except Exception as e:
            print(f"Error loading JSON files: {str(e)}")
            return False
    
    def clean_data(self) -> int:
        """Clean the data by removing empty text segments
        
        Returns:
            Number of segments after cleaning
        """
        initial_count = len(self.transcript_data)
        self.transcript_data = [segment for segment in self.transcript_data 
                               if segment['text'] and segment['text'].strip()]
        cleaned_count = len(self.transcript_data)
        
        print(f"After cleaning: {cleaned_count} segments with valid text")
        return cleaned_count
    
    def get_text_data(self) -> List[str]:
        """Get the text data from all transcript segments
        
        Returns:
            List of text strings
        """
        return [segment['text'] for segment in self.transcript_data]
    
    def get_batch_iterator(self, batch_size: int = 10):
        """Get an iterator for processing data in batches
        
        Args:
            batch_size: Size of each batch
            
        Yields:
            Tuple of (batch_index, batch_texts, batch_metadata)
        """
        for i in range(0, len(self.transcript_data), batch_size):
            batch_data = self.transcript_data[i:i+batch_size]
            batch_texts = [segment['text'] for segment in batch_data]
            batch_metadata = batch_data
            yield i, batch_texts, batch_metadata


class ExecutionTimer:
    """Utility class for timing execution"""
    
    def __init__(self):
        self.start_time = None
        self.end_time = None
        
    def start(self):
        """Start the timer"""
        self.start_time = time.time()
        
    def stop(self):
        """Stop the timer"""
        self.end_time = time.time()
        
    def get_elapsed_time(self) -> float:
        """Get elapsed time in seconds"""
        if self.start_time is None or self.end_time is None:
            return 0.0
        return self.end_time - self.start_time


class EmbeddingRAGPipeline:
    """Main orchestrator class for the embedding RAG pipeline"""
    
    def __init__(self, transcripts_directory: str = "Masked Transcripts(212)", 
                 collection_name: str = "transcript_segments",
                 persist_directory: str = "chromadb_storage", 
                 model_name: str = 'jinaai/jina-embeddings-v3',
                 batch_size: int = 10):
        """Initialize the RAG pipeline
        
        Args:
            transcripts_directory: Directory containing JSON transcript files
            collection_name: Name of the ChromaDB collection
            persist_directory: Directory for ChromaDB storage
            model_name: Name of the embedding model
            batch_size: Batch size for processing
        """
        self.transcripts_directory = transcripts_directory
        self.collection_name = collection_name
        self.batch_size = batch_size
        
        # Initialize components
        self.embedding_model = EmbeddingModel(model_name)
        self.chromadb_manager = ChromaDBManager(persist_directory)
        self.json_processor = JSONProcessor(transcripts_directory)
        self.timer = ExecutionTimer()
        
        # Statistics
        self.total_processed = 0
        self.successful_embeddings = 0
        
    def run_pipeline(self) -> bool:
        """Run the complete embedding RAG pipeline
        
        Returns:
            bool: True if pipeline completed successfully, False otherwise
        """
        print("Starting JSON transcript processing and embedding generation...")
        self.timer.start()
        
        # Step 1: Load embedding model
        if not self.embedding_model.load_model():
            return False
            
        # Step 2: Initialize ChromaDB
        if not self.chromadb_manager.initialize_client():
            return False
            
        self.chromadb_manager.get_or_create_collection(self.collection_name)
        
        # Step 3: Load and clean JSON transcript data
        if not self.json_processor.load_json_files():
            return False
            
        self.json_processor.clean_data()
        
        # Step 4: Process embeddings in batches
        success = self._process_embeddings_in_batches()
        
        self.timer.stop()
        self._print_execution_summary()
        
        return success
    
    def _process_embeddings_in_batches(self) -> bool:
        """Process embeddings in batches"""
        total_batches = (len(self.json_processor.transcript_data) - 1) // self.batch_size + 1
        max_storage_batch = 1000  # Store embeddings in batches of 1000
        
        embeddings = []
        documents = []
        ids = []
        
        for batch_index, batch_texts, batch_metadata in self.json_processor.get_batch_iterator(self.batch_size):
            batch_num = batch_index // self.batch_size + 1
            print(f"Processing batch {batch_num}/{total_batches} ({len(batch_texts)} segments)...")
            
            for j, (text, metadata) in enumerate(zip(batch_texts, batch_metadata)):
                try:
                    embedding_vector = self.embedding_model.generate_embedding(text)
                    
                    if embedding_vector:
                        embeddings.append(embedding_vector)
                        documents.append(str(text))
                        # Create unique ID with file info and timing
                        file_name = os.path.basename(metadata['file_path']).replace('.json', '')
                        segment_id = f"{file_name}_segment_{batch_index+j}_{metadata['start']:.2f}s"
                        ids.append(segment_id)
                        self.total_processed += 1
                        
                        # Print progress every 10 segments
                        if self.total_processed % 10 == 0:
                            print(f"  Processed {self.total_processed} segments...")
                        
                        # Store in ChromaDB when we reach max_storage_batch size
                        if len(embeddings) >= max_storage_batch:
                            success = self.chromadb_manager.add_embeddings(documents, embeddings, ids)
                            if success:
                                self.successful_embeddings += len(embeddings)
                                print(f"  Stored batch of {len(embeddings)} embeddings")
                            else:
                                print(f"  Failed to store batch of {len(embeddings)} embeddings")
                                return False
                            
                            # Reset collections for next batch
                            embeddings = []
                            documents = []
                            ids = []
                
                except Exception as e:
                    print(f"  Error processing segment {batch_index+j}: {str(e)}")
                    continue
            
            # Small delay between batches to avoid rate limiting
            time.sleep(0.1)
        
        # Store any remaining embeddings
        if embeddings:
            success = self.chromadb_manager.add_embeddings(documents, embeddings, ids)
            if success:
                self.successful_embeddings += len(embeddings)
                print(f"Stored final batch of {len(embeddings)} embeddings")
                collection_count = self.chromadb_manager.get_collection_count()
                print(f"Collection now contains {collection_count} items")
                return True
            else:
                print(f"Failed to store final batch of {len(embeddings)} embeddings")
                return False
        else:
            if self.successful_embeddings > 0:
                collection_count = self.chromadb_manager.get_collection_count()
                print(f"Collection now contains {collection_count} items")
                return True
            else:
                print("No embeddings were generated successfully")
                return False
    
    def _print_execution_summary(self):
        """Print execution summary"""
        elapsed_time = self.timer.get_elapsed_time()
        
        print(f"\n{'='*50}")
        print(f"EXECUTION SUMMARY:")
        print(f"{'='*50}")
        print(f"Total transcript segments processed: {self.total_processed}")
        print(f"Embeddings generated: {self.successful_embeddings}")
        print(f"Total execution time: {elapsed_time:.4f} seconds")
        if self.total_processed > 0:
            print(f"Average time per segment: {elapsed_time/self.total_processed:.4f} seconds")
        print(f"{'='*50}")


class MP3FileManager:
    """Handles MP3 file operations for call recordings"""
    
    def __init__(self, recordings_directory: str = "Reviewed_Call_Recordings(60)"):
        """Initialize MP3 file manager
        
        Args:
            recordings_directory: Path to the directory containing MP3 files
        """
        self.recordings_directory = recordings_directory
        self.mp3_files = []
        
    def discover_mp3_files(self) -> bool:
        """Discover all MP3 files in the recordings directory
        
        Returns:
            bool: True if files found successfully, False otherwise
        """
        try:
            # Use absolute path construction
            mp3_pattern = os.path.join(os.path.abspath(self.recordings_directory), "*.mp3")
            self.mp3_files = glob.glob(mp3_pattern)
            
            if not self.mp3_files:
                print(f"No MP3 files found in {mp3_pattern}")
                return False
                
            print(f"Found {len(self.mp3_files)} MP3 call recording files")
            # Print the first few files for debugging
            for i, file in enumerate(self.mp3_files[:3]):
                print(f"  Sample file {i+1}: {file}")
            return True
            
        except Exception as e:
            print(f"Error discovering MP3 files: {str(e)}")
            return False
    
    def get_mp3_files(self) -> List[str]:
        """Get list of discovered MP3 files
        
        Returns:
            List of MP3 file paths
        """
        return self.mp3_files
    
    def get_file_info(self, mp3_file: str) -> Dict[str, Any]:
        """Get information about an MP3 file
        
        Args:
            mp3_file: Path to the MP3 file
            
        Returns:
            Dictionary with file information
        """
        try:
            file_stats = os.stat(mp3_file)
            return {
                'file_path': mp3_file,
                'file_name': os.path.basename(mp3_file),
                'file_size': file_stats.st_size,
                'created_time': file_stats.st_ctime,
                'modified_time': file_stats.st_mtime
            }
        except Exception as e:
            print(f"Error getting file info for {mp3_file}: {str(e)}")
            return {}


class WhisperTranscriber:
    """Handles audio transcription using OpenAI Whisper"""
    
    def __init__(self, model_name: str = "base"):
        """Initialize Whisper transcriber
        
        Args:
            model_name: Whisper model to use ('tiny', 'base', 'small', 'medium', 'large')
        """
        self.model_name = model_name
        self.model = None
        
    def load_model(self) -> bool:
        """Load the Whisper model
        
        Returns:
            bool: True if model loaded successfully, False otherwise
        """
        try:
            print(f"Loading Whisper model: {self.model_name}...")
            self.model = whisper.load_model(self.model_name)
            print("Whisper model loaded successfully!")
            return True
        except Exception as e:
            print(f"Error loading Whisper model: {str(e)}")
            return False
    
    def transcribe_audio(self, audio_path: str) -> Optional[Dict[str, Any]]:
        """Transcribe audio file to text
        
        Args:
            audio_path: Path to the audio file
            
        Returns:
            Dictionary with transcription results or None if error
        """
        if not self.model:
            raise ValueError("Model not loaded. Call load_model() first.")
            
        try:
            print(f"Transcribing: {os.path.basename(audio_path)}")
            print(f"Full path: {audio_path}")
            print(f"File exists: {os.path.exists(audio_path)}")
            print(f"File size: {os.path.getsize(audio_path) if os.path.exists(audio_path) else 'N/A'} bytes")
            
            # Ensure the audio path exists
            if not os.path.exists(audio_path):
                raise FileNotFoundError(f"Audio file not found: {audio_path}")
            
            # Convert to absolute path and normalize
            audio_path = os.path.abspath(audio_path)
            print(f"Absolute path: {audio_path}")
            
            # Check if ffmpeg is available (required by Whisper for MP3 processing)
            try:
                import subprocess
                subprocess.run(['ffmpeg', '-version'], capture_output=True, check=True)
                print("FFmpeg is available")
            except (subprocess.CalledProcessError, FileNotFoundError):
                print("Warning: FFmpeg not found. This may cause issues with MP3 processing.")
                print("Please install FFmpeg: https://ffmpeg.org/download.html")
                
            result = self.model.transcribe(audio_path)
            
            # Extract segments for better granularity
            segments = []
            if 'segments' in result:
                for segment in result['segments']:
                    segments.append({
                        'text': segment.get('text', '').strip(),
                        'start': segment.get('start', 0),
                        'end': segment.get('end', 0),
                        'speaker_id': 'unknown'  # Whisper doesn't provide speaker diarization
                    })
            else:
                # If no segments, create one segment with full text
                segments.append({
                    'text': result.get('text', '').strip(),
                    'start': 0,
                    'end': 0,
                    'speaker_id': 'unknown'
                })
            
            return {
                'text': result.get('text', ''),
                'segments': segments,
                'language': result.get('language', 'unknown'),
                'file_path': audio_path
            }
            
        except Exception as e:
            print(f"Error transcribing {audio_path}: {str(e)}")
            print(f"Error type: {type(e).__name__}")
            import traceback
            print(f"Full traceback: {traceback.format_exc()}")
            return None
    
    def process_audio_chunk(self, audio_path: str, chunk_duration: int = 300) -> List[Dict[str, Any]]:
        """Process long audio files in chunks
        
        Args:
            audio_path: Path to the audio file
            chunk_duration: Duration of each chunk in seconds
            
        Returns:
            List of transcription results for each chunk
        """
        try:
            # Load audio file
            audio, sr = librosa.load(audio_path, sr=16000)
            total_duration = len(audio) / sr
            
            results = []
            chunk_size = chunk_duration * sr
            
            for start_idx in range(0, len(audio), chunk_size):
                end_idx = min(start_idx + chunk_size, len(audio))
                chunk = audio[start_idx:end_idx]
                
                # Save temporary chunk file
                temp_chunk_path = f"temp_chunk_{start_idx//chunk_size}.wav"
                import soundfile as sf
                sf.write(temp_chunk_path, chunk, sr)
                
                # Transcribe chunk
                chunk_result = self.transcribe_audio(temp_chunk_path)
                if chunk_result:
                    # Adjust timestamps
                    start_time = start_idx / sr
                    for segment in chunk_result['segments']:
                        segment['start'] += start_time
                        segment['end'] += start_time
                    results.append(chunk_result)
                
                # Clean up temp file
                try:
                    os.remove(temp_chunk_path)
                except:
                    pass
            
            return results
            
        except Exception as e:
            print(f"Error processing audio chunks for {audio_path}: {str(e)}")
            return []


class MP3EmbeddingPipeline:
    """Pipeline for processing MP3 files and generating embeddings"""

    def __init__(self, recordings_directory: str = "Reviewed_Call_Recordings(60)",
                 collection_name: str = "transcript_segments",
                 persist_directory: str = "chromadb_storage",
                 model_name: str = 'jinaai/jina-embeddings-v3',
                 whisper_model: str = "base",
                 batch_size: int = 10):
        """Initialize the MP3 embedding pipeline
        
        Args:
            recordings_directory: Directory containing MP3 files
            collection_name: Name of the ChromaDB collection
            persist_directory: Directory for ChromaDB storage
            model_name: Name of the embedding model
            whisper_model: Whisper model to use for transcription
            batch_size: Batch size for processing
        """
        self.recordings_directory = recordings_directory
        self.collection_name = collection_name
        self.batch_size = batch_size
        
        # Initialize components
        self.embedding_model = EmbeddingModel(model_name)
        self.chromadb_manager = ChromaDBManager(persist_directory)
        self.mp3_manager = MP3FileManager(recordings_directory)
        self.transcriber = WhisperTranscriber(whisper_model)
        self.timer = ExecutionTimer()
        
        # Statistics
        self.total_processed = 0
        self.successful_embeddings = 0
        self.transcribed_files = 0
        
    def run_pipeline(self) -> bool:
        """Run the complete MP3 processing and embedding generation pipeline
        
        Returns:
            bool: True if pipeline completed successfully, False otherwise
        """
        print("Starting MP3 processing and embedding generation...")
        self.timer.start()
        
        # Step 1: Load models
        if not self.embedding_model.load_model():
            return False
            
        if not self.transcriber.load_model():
            return False
            
        # Step 2: Initialize ChromaDB (use existing collection)
        if not self.chromadb_manager.initialize_client():
            return False
            
        self.chromadb_manager.get_or_create_collection(self.collection_name)
        
        # Step 3: Discover MP3 files
        if not self.mp3_manager.discover_mp3_files():
            return False
        
        # Step 4: Process MP3 files
        success = self._process_mp3_files()
        
        self.timer.stop()
        self._print_execution_summary()
        
        return success
    
    def _process_mp3_files(self) -> bool:
        """Process all MP3 files and generate embeddings"""
        mp3_files = self.mp3_manager.get_mp3_files()
        total_files = len(mp3_files)
        
        embeddings = []
        documents = []
        ids = []
        max_storage_batch = 1000
        
        for file_idx, mp3_file in enumerate(mp3_files):
            print(f"\nProcessing file {file_idx + 1}/{total_files}: {os.path.basename(mp3_file)}")
            
            # Transcribe MP3 file
            transcription_result = self.transcriber.transcribe_audio(mp3_file)
            if not transcription_result:
                print(f"Failed to transcribe {mp3_file}")
                continue
                
            self.transcribed_files += 1
            
            # Process each segment
            for segment_idx, segment in enumerate(transcription_result['segments']):
                if not segment['text'] or not segment['text'].strip():
                    continue
                    
                try:
                    text = segment['text'].strip()
                    embedding_vector = self.embedding_model.generate_embedding(text)
                    
                    if embedding_vector:
                        embeddings.append(embedding_vector)
                        documents.append(text)
                        
                        # Create unique ID for MP3 segment
                        file_name = os.path.basename(mp3_file).replace('.mp3', '')
                        segment_id = f"mp3_{file_name}_segment_{segment_idx}_{segment['start']:.2f}s"
                        ids.append(segment_id)
                        self.total_processed += 1
                        
                        # Print progress
                        if self.total_processed % 10 == 0:
                            print(f"  Processed {self.total_processed} segments...")
                        
                        # Store in ChromaDB when we reach max_storage_batch size
                        if len(embeddings) >= max_storage_batch:
                            success = self.chromadb_manager.add_embeddings(documents, embeddings, ids)
                            if success:
                                self.successful_embeddings += len(embeddings)
                                print(f"  Stored batch of {len(embeddings)} embeddings")
                            else:
                                print(f"  Failed to store batch of {len(embeddings)} embeddings")
                                return False
                            
                            # Reset collections for next batch
                            embeddings = []
                            documents = []
                            ids = []
                
                except Exception as e:
                    print(f"  Error processing segment {segment_idx} from {mp3_file}: {str(e)}")
                    continue
        
        # Store any remaining embeddings
        if embeddings:
            success = self.chromadb_manager.add_embeddings(documents, embeddings, ids)
            if success:
                self.successful_embeddings += len(embeddings)
                print(f"Stored final batch of {len(embeddings)} embeddings")
                collection_count = self.chromadb_manager.get_collection_count()
                print(f"Collection now contains {collection_count} items")
                return True
            else:
                print(f"Failed to store final batch of {len(embeddings)} embeddings")
                return False
        else:
            if self.successful_embeddings > 0:
                collection_count = self.chromadb_manager.get_collection_count()
                print(f"Collection now contains {collection_count} items")
                return True
            else:
                print("No embeddings were generated successfully")
                return False
    
    def _print_execution_summary(self):
        """Print execution summary"""
        elapsed_time = self.timer.get_elapsed_time()
        
        print(f"\n{'='*50}")
        print(f"MP3 PROCESSING EXECUTION SUMMARY:")
        print(f"{'='*50}")
        print(f"MP3 files transcribed: {self.transcribed_files}")
        print(f"Total transcript segments processed: {self.total_processed}")
        print(f"Embeddings generated: {self.successful_embeddings}")
        print(f"Total execution time: {elapsed_time:.4f} seconds")
        if self.total_processed > 0:
            print(f"Average time per segment: {elapsed_time/self.total_processed:.4f} seconds")
        print(f"{'='*50}")


def process_transcripts_and_generate_embeddings():
    """Main function to process JSON transcripts and generate embeddings"""
    pipeline = EmbeddingRAGPipeline(
        transcripts_directory="Masked Transcripts(212)",
        collection_name="transcript_segments"
    )
    return pipeline.run_pipeline()


def process_mp3_files_and_generate_embeddings():
    """Main function to process MP3 files and generate embeddings"""
    pipeline = MP3EmbeddingPipeline(
        recordings_directory="Reviewed_Call_Recordings(60)",
        collection_name="transcript_segments",  # Same collection as JSON transcripts
        whisper_model="base"  # You can change to 'small', 'medium', or 'large' for better accuracy
    )
    return pipeline.run_pipeline()


if __name__ == "__main__":
    # Choose which pipeline to run
    print("Choose processing option:")
    print("1. Process JSON transcript files")
    print("2. Process MP3 files")
    print("3. Process both JSON and MP3 files")
    
    choice = input("Enter your choice (1, 2, or 3): ").strip()
    
    if choice == "1":
        print("\nProcessing JSON transcript files...")
        process_transcripts_and_generate_embeddings()
    elif choice == "2":
        print("\nProcessing MP3 files...")
        process_mp3_files_and_generate_embeddings()
    elif choice == "3":
        print("\nProcessing JSON transcript files first...")
        process_transcripts_and_generate_embeddings()
        print("\nNow processing MP3 files...")
        process_mp3_files_and_generate_embeddings()
    else:
        print("Invalid choice. Running MP3 processing by default...")
        process_mp3_files_and_generate_embeddings()