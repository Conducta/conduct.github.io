#include <stdio.h>
#include <string.h>

// Function to print an array
void printArray(int arr[], int n) {
	for (int i = 0; i < n; i++) {
		printf("%d ", arr[i]);
	}
	printf("\n");
}

// Counting Sort implementation
void countingSort(int arr[], int n) {
	if (n <= 1) {
		return;
	}
	
	// Find the range of input values
	int max = arr[0];
	for (int i = 1; i < n; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}
	
	// Create a count array
	int count[max + 1];
	memset(count, 0, sizeof(count));
	
	// Count the occurrences of each element
	for (int i = 0; i < n; i++) {
		count[arr[i]]++;
	}
	
	// Calculate the cumulative count array
	for (int i = 1; i <= max; i++) {
		count[i] += count[i - 1];
	}
	
	// Create a sorted output array
	int output[n];
	for (int i = n - 1; i >= 0; i--) {
		output[count[arr[i]] - 1] = arr[i];
		count[arr[i]]--;
	}
	
	// Copy the sorted output array to the input array
	for (int i = 0; i < n; i++) {
		arr[i] = output[i];
	}
}

int main() {
	int arr[] = {4, 2, 2, 8, 3, 3, 1};
	int n = sizeof(arr) / sizeof(arr[0]);
	
	printf("Original array: ");
	printArray(arr, n);
	
	countingSort(arr, n);
	
	printf("Sorted array: ");
	printArray(arr, n);
	
	return 0;
}
