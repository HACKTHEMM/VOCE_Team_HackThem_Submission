import asyncio
import tempfile
import edge_tts

# Simplified language dictionary with only English and Hindi
language_dict = {
    "English": {
        "Neerja": "en-IN-NeerjaNeural",
        "Prabhat": "en-IN-PrabhatNeural",
        "Jenny": "en-US-JennyNeural",
    },
    "Hindi": {
        "Madhur": "hi-IN-MadhurNeural",
        "Swara": "hi-IN-SwaraNeural",
    },
}

async def text_to_speech_edge(text, language, speaker):
    voice = language_dict[language][speaker]
    
    communicate = edge_tts.Communicate(text, voice)
    audio_path = 'C:/Users/HP/Programs/Projects/matrix-hackathon/multilingual/audio_hindi_Madhur.mp3'
    await communicate.save(audio_path)

    return audio_path

async def main():
    """
    Main function to demonstrate the text-to-speech conversion.
    """
    # --- Customize your input here ---
    # language = "English"  # Choose "English" or "Hindi"
    # speaker = "Jenny"   # Choose a speaker from the language_dict
    # input_text = """
    # I am testing the last big piece of the puzzle, multilingual TTS, which I think I have finally figured out. It has been a long and challenging journey, but now it feels like I am very close to the destination. Seamlessly integrating different languages and their distinct pronunciations into a single system was just like solving a big puzzle.
    # Specifically, creating natural and clear voices for different languages was the hardest part. After months of hard work and countless tests, the system is now able to convert text to speech in Hindi, English, Spanish, and many other languages without any hitches. This success is a significant milestone for the project and opens up new possibilities for making content accessible to a global audience in the future. Now I am excited to integrate it into my main application.
    # """
    
    # --- Or for Hindi ---
    language = "Hindi"
    speaker = "Madhur"
    input_text = """ज़रूर, इस विचार को आगे बढ़ाते हुए, यहाँ एक विस्तारित संस्करण है:
    पहेली के अंतिम बड़े टुकड़े, बहुभाषी टीटीएस, का परीक्षण कर रहा हूँ, जिसके बारे में मुझे लगता है कि मैंने अंततः इसका पता लगा लिया है। यह एक लंबा और चुनौतीपूर्ण सफर रहा है, लेकिन अब ऐसा महसूस हो रहा है कि मैं मंज़िल के बहुत करीब हूँ। विभिन्न भाषाओं और उनके अलग-अलग उच्चारणों को एक ही सिस्टम में सहजता से एकीकृत करना किसी बड़ी पहेली को सुलझाने जैसा ही था।
    विशेष रूप से, अलग-अलग भाषाओं के लिए स्वाभाविक और स्पष्ट आवाज़ें बनाना सबसे कठिन हिस्सा था। महीनों की मेहनत और अनगिनत परीक्षणों के बाद, अब सिस्टम हिंदी, अंग्रेजी, स्पेनिश और कई अन्य भाषाओं में बिना किसी रुकावट के टेक्स्ट को स्पीच में बदल पा रहा है। यह सफलता इस प्रोजेक्ट के लिए एक महत्वपूर्ण मील का पत्थर है और भविष्य में वैश्विक दर्शकों के लिए सामग्री को सुलभ बनाने की नई संभावनाओं के द्वार खोलती है। अब मैं इसे अपने मुख्य एप्लिकेशन में एकीकृत करने के लिए उत्साहित हूँ।"""

    print(f"Generating audio for the text: '{input_text}'")
    print(f"Language: {language}, Speaker: {speaker}")

    # Generate the audio file
    audio_file_path = await text_to_speech_edge(input_text, language, speaker)

    print(f"\nAudio generated successfully!")
    print(f"File saved at: {audio_file_path}")

if __name__ == "__main__":
    # To run the async main function
    asyncio.run(main())