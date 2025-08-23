from playwright.sync_api import sync_playwright
import logging

logging.basicConfig(level=logging.INFO)

def run():
    with sync_playwright() as p:
        logging.info("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        logging.info("Navigating to http://localhost:3001...")
        page.goto("http://localhost:3001", timeout=60000)
        logging.info("Waiting for h1 selector...")
        page.wait_for_selector("h1")
        logging.info("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/homepage.png")
        logging.info("Closing browser...")
        browser.close()
        logging.info("Done.")

run()
