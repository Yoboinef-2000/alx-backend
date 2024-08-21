#!/usr/bin/python3

"""BasicCache module."""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Basic Cache Class.
    """

    def put(self, key, item):
        """Add item."""
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """Get item."""
        theItem = self.cache_data.get(key)
        return theItem
