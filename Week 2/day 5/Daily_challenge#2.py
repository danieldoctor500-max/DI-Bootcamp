import requests
import time


def get_load_time(url, timeout=10):
    """
    Measures the time it takes to get a complete response from a webpage.

    Args:
        url (str): The URL to test (should include http:// or https://)
        timeout (int): Max seconds to wait before giving up

    Returns:
        float: Load time in seconds, or None if the request failed
    """
    try:
        start_time = time.time()
        response = requests.get(url, timeout=timeout)
        end_time = time.time()

        elapsed = end_time - start_time
        print(f"{url} -> {elapsed:.3f}s (status: {response.status_code})")
        return elapsed

    except requests.exceptions.RequestException as e:
        print(f"{url} -> Failed ({e})")
        return None


if __name__ == "__main__":
    sites = [
        "https://www.google.com",
        "https://www.ynet.co.il",
        "https://www.imdb.com",
        "https://www.wikipedia.org",
        "https://www.github.com",
    ]

    results = {}
    for site in sites:
        load_time = get_load_time(site)
        if load_time is not None:
            results[site] = load_time

    print("\n--- Summary ---")
    for site, t in sorted(results.items(), key=lambda x: x[1]):
        print(f"{t:.3f}s  {site}")