import httpx
import asyncio

async def run():
    async with httpx.AsyncClient() as client:
        r = await client.post('http://localhost:8000/auth/login', json={'email': 'priya@reguvigil.com', 'password': 'test'})
        token = r.json().get('access_token')
        if not token:
            print("Login failed")
            return
        r2 = await client.get('http://localhost:8000/patients/PT-1067/readings', headers={'Authorization': f'Bearer {token}'})
        print(r2.text)

asyncio.run(run())
