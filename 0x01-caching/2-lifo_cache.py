#!/usr/bin/python3

""" LIFOCache module.
"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """ LIFOCache class.
    """

    def __init__(self):
        """ Initialize.
        """
        super().__init__()
        self.last_key = None

    def put(self, key, item):
        """ Add item using LIFO.
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS\
           and key not in self.cache_data:
            if self.last_key is not None:
                del self.cache_data[self.last_key]
                print(f"DISCARD: {self.last_key}")

        self.cache_data[key] = item
        self.last_key = key

    def get(self, key):
        """ Get item.
        """
        return self.cache_data.get(key, None)
