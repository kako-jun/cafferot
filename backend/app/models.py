from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Cafferot(BaseModel):
    """カフェロット"""
    id: str
    name: str
    imageData: str  # Base64 or URL
    audioData: Optional[str] = None
    createdAt: datetime
    authorId: str
    adoptionCount: int = 0
    value: int = 0

class Cafe(BaseModel):
    """カフェ"""
    id: str
    ownerId: str
    name: str
    level: int
    displayedCafferots: list[Cafferot]

class CafeStats(BaseModel):
    """カフェステータス"""
    revenue: int  # 売上
    customerFrequency: int  # 来店頻度
    regularCustomers: int  # 常連客数
    popularity: int  # 人気度
