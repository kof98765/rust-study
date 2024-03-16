fn bubble_sort<T: Ord>(arr: &mut [T]) {
    let mut n = arr.len();
    let mut swapped = true;

    while swapped {
        swapped = false;
        for i in 1..n {
            if arr[i - 1] > arr[i] {
                arr.swap(i - 1, i);
                swapped = true;
            }
        }
        n -= 1;
    }
}

fn main() {
    let mut vec = vec![4, 2, 8, 5, 3, 9, 1, 6, 7];
    bubble_sort(&mut vec);
    println!("Sorted vector: {:?}", vec);

    let mut strings = vec!["banana", "apple", "orange", "grape", "cherry"];
    bubble_sort(&mut strings);
    println!("Sorted strings: {:?}", strings);
}

