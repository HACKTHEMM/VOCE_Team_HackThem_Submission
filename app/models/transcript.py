from pydantic import BaseModel

class TranscriptReq(BaseModel):
    transcript : str
    session_id: str
