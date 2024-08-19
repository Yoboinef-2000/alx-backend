#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict, Any


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of size two containing a start index and an end index."""
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0."""
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {i: dataset[i] for i in range(len(dataset))}
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = 0, page_size: int = 10) -> Dict:
        """
        Return a dictionary with the following key-value pairs:
        - index: the current start index of the return page.
        - next_index: the next index to query with.
        - page_size: the current page size.
        - data: the actual page of the dataset.
        """
        assert isinstance(index, int) and index >= 0, "Index must be a non-negative integer."
        assert isinstance(page_size, int) and page_size > 0, "Page size must be a positive integer."

        dataset = self.indexed_dataset()
        data = []
        current_index = index
        next_index = index

        # Collect `page_size` items starting from `index`
        while len(data) < page_size and next_index < len(dataset):
            if current_index in dataset:
                data.append(dataset[current_index])
            current_index += 1
            next_index = current_index

        return {
            "index": index,
            "next_index": next_index,
            "page_size": page_size,
            "data": data
        }
