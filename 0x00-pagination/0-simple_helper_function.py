#!/usr/bin/env python3

"""
The function in this module returns a tuple of size
two containing a start index and an end index corresponding
to the range of indexes to return in a list for those
particular pagination parameters.
"""


def index_range(page: int, page_size: int) -> tuple:
    """Look at the module comments."""
    startIndex = (page - 1) * page_size
    end_index = startIndex + page_size
    return (startIndex, end_index)
