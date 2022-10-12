const express = require('express');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello, world!' });
});

router.get('/colors', async (req, res) => {
  const { colorHex } = req.body;
  
  if(!colorHex) {
    return res.status(500).json({ message: 'Invalid request body!' });
  }
  
  if(colorHex.length !== 6) { 
    return res.status(500).json({ message: 'Invalid color code size!' });
  }

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.color-name.com/hex/${colorHex}`);
    const data = await page.evaluate(() => { 
      return { colorName: document.querySelector('.color-code').textContent }
    });
    return res.status(200).json({ data: formatColorName(data.colorName) });
  })();
});

function formatColorName(colorName) {
  return colorName.substring(17).replace(/\t/g, '');
}

module.exports = router;
