from typing import List
from fastapi import FastAPI
from pydantic import BaseModel

from .process import process

app = FastAPI()

@app.get('/')
def health():
  return "ok"

@app.get('/health/readiness')
def health():
  return "ok"

class EstimateBody(BaseModel):
  ecg_data: List[int]
  ppg_data: List[int]
  sampling_rate: int
  ptt_0: float
  sbp_0: int
  dbp_0: int

class EstimateResponse(BaseModel):
  blood_pressure: int
  heart_rate: float
  ptt: float

@app.post("/estimate", response_model=EstimateResponse)
def estimate(body: EstimateBody):
  heart_rate, blood_pressure, ptt = process(
    ppg_data=body.ppg_data,
    ecg_data=body.ecg_data,
    sampling_rate=body.sampling_rate,
    ptt_0=body.ptt_0,
    sbp_0=body.sbp_0,
    dbp_0=body.dbp_0,
  )
  return {"blood_pressure": blood_pressure, "heart_rate": heart_rate, "ptt": ptt}
