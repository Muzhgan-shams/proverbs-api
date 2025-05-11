# 📚 Dari & Pashto Proverbs REST API

A simple RESTful API built with Express that serves meaningful proverbs and sayings in **Dari** and **Pashto**, including English translations, meanings, category, and transliterations.

You can:
- Get all proverbs (by language)
- Get a single proverb by ID
- Add new proverbs
- Update or delete a proverb
- Reset the user collection from the original source
- Fetch the original static collection

---


### The API will run at:
👉 http://localhost:8000/api/proverbs/dari

🔁 Example Endpoints
  `GET /api/proverbs/dari` – Get all Dari user proverbs
  
  `GET /api/proverbs/dari/1` – Get specific proverb by ID
  
  `POST /api/proverbs/dari` – Add a new proverb
  
  `PUT /api/proverbs/dari/1` – Update a proverb by ID
  
  `DELETE /api/proverbs/dari/1` – Delete a proverb
  
  `GET /api/proverbs/dari/original` – Get original untouched file
  
`POST /api/proverbs/dari/reset` – Reset user file from original

Replace dari with pashto for Pashto equivalents.

The link to API will be provided here: 

