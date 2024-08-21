#!/usr/bin/python3

""" LFUCache module.
"""
from base_caching import BaseCaching
from collections import defaultdict, OrderedDict


class LFUCache(BaseCaching):
    """ LFUCache class.
    """

    def __init__(self):
        """ Initialize.
        """
        super().__init__()
        self.frequency = defaultdict(int)
        self.frequency_order = defaultdict(OrderedDict)

    def put(self, key, item):
        """ Add item using LFU.
        """
        if key is None or item is None:
            return

        if key in self.cache_data:
            self._update_frequency(key)
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                self._evict_least_frequent()

            self.cache_data[key] = item
            self.frequency[key] = 1
            self.frequency_order[1][key] = True

    def get(self, key):
        """ Get item.
        """
        if key in self.cache_data:
            self._update_frequency(key)
            return self.cache_data[key]
        return None

    def _update_frequency(self, key):
        """ Update the frequency of the given key.
        """
        freq = self.frequency[key]
        del self.frequency_order[freq][key]

        if not self.frequency_order[freq]:
            del self.frequency_order[freq]

        self.frequency[key] += 1
        new_freq = self.frequency[key]
        self.frequency_order[new_freq][key] = True

    def _evict_least_frequent(self):
        """ Evict the least frequently used item from the cache """
        min_freq = min(self.frequency_order.keys())
        lru_key = next(iter(self.frequency_order[min_freq]))
        del self.cache_data[lru_key]
        del self.frequency[lru_key]
        del self.frequency_order[min_freq][lru_key]

        if not self.frequency_order[min_freq]:
            del self.frequency_order[min_freq]

        print(f"DISCARD: {lru_key}")
