import time 
st = time.time()
print(f'Starting Up..')
import pandas as pd
import sys
from dotenv import load_dotenv
from app.core.assistant.voice_assistant import IntegratedVoiceAssistant

def init_components():
    # --- Initialize Voice Assistant ---
    print("Initializing the voice components...\n")
    integrated_assistant = IntegratedVoiceAssistant()
    assistant = integrated_assistant.get_voice_assistant()
    print(f'Initializing of the voice components Completed running interface..\n')
    return assistant


def run_interface(csv_input_path: str, csv_output_path: str):
    load_dotenv()

    try:
        assistant = init_components()
    except Exception as e:
        raise RuntimeError('Error while initializing components.')

    try:
        df = pd.read_csv(csv_input_path)
        print("Loaded questions:")
        print(f'Reading top 5 queries in the csv : {df[:5]}')
    except FileNotFoundError:
        print(f"File not found: {csv_input_path}")
        return

    et = time.time()
    print(f'time : {et-st}')
    print(f'Reading {csv_output_path} now and generating responses.')
    df["response"] = df.get("response", "").astype(str)
    
    for i, row in df.iterrows():
        question = row["question"]
        result = assistant.handle_transcription(question)
        response_text = result.get("text", "")
        df.at[i, "response"] = response_text
        print(f"\nQuestion: {question}\nResponse: {response_text}\n")

    df.to_csv(csv_output_path, index=False)
    print(f"\n✅ Responses saved to: {csv_output_path}")

    print("\n📄 Updated CSV preview:")
    print(pd.read_csv(csv_output_path)[:5])


if __name__ == "__main__":
    run_interface(csv_input_path='./test.csv', csv_output_path='./output.csv')
