#!/usr/bin/python3

""" FIFOCache module.
"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache class.
    """

    def __init__(self):
        """ Initialize.
        """
        super().__init__()
        self.order = []

    def put(self, key, item):
        """ Add item using FIFO.
        """
        if key is None or item is None:
            return

        if key not in self.cache_data:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                first_key = self.order.pop(0)
                del self.cache_data[first_key]
                print(f"DISCARD: {first_key}")

        self.cache_data[key] = item
        if key not in self.order:
            self.order.append(key)

    def get(self, key):
        """ Get item.
        """
        return self.cache_data.get(key, None)
