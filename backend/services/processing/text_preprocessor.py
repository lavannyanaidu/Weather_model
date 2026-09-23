import re

class TextPreprocessor:
    def clean_text(self, text: str) -> str:
        if not text:
            return ""
        # Remove excess whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    def extract_hashtags(self, text: str) -> list:
        if not text:
            return []
        return re.findall(r'#\w+', text)

    def extract_urls(self, text: str) -> list:
        if not text:
            return []
        return re.findall(r'https?://\S+', text)
