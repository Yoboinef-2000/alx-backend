#!/usr/bin/python3

""" MRUCache module.
"""
from base_caching import BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """ MRUCache class.
    """

    def __init__(self):
        """ Initialize.
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """ Add item using MRU.
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data.move_to_end(key)
        self.cache_data[key] = item

        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            discarded_key, _ = self.cache_data.popitem(last=True)
            print(f"DISCARD: {discarded_key}")

    def get(self, key):
        """ Get item.
        """
        if key in self.cache_data:
            self.cache_data.move_to_end(key)
            return self.cache_data[key]
        return None
