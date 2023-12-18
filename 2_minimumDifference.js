function minimumDifference(nums) {
  const n = nums.length >> 1; //calculate size of each partition
  const f = new Map();
  const g = new Map();

  //generate subset of first n elements and calculate sum
  for (let i = 0; i < 1 << n; ++i) {
    let s = 0,
      cnt = 0;
    let s1 = 0,
      cnt1 = 0;

    // Calculate sums and counts for subsets of the first and second halves of nums
    for (let j = 0; j < n; ++j) {
      if ((i & (1 << j)) !== 0) {
        s += nums[j];
        ++cnt;
        s1 += nums[n + j];
        ++cnt1;
      } else {
        s -= nums[j];
        s1 -= nums[n + j];
      }
    }

    // Store sums in corresponding maps
    if (!f.has(cnt)) f.set(cnt, new Set());
    f.get(cnt).add(s);
    if (!g.has(cnt1)) g.set(cnt1, new Set());
    g.get(cnt1).add(s1);
  }

  // Initialize the minimum difference
  let ans = Number.MAX_SAFE_INTEGER;

  // Iterate through the sets of sums and find the minimum difference
  for (let i = 0; i <= n; ++i) {
    const fi = Array.from(f.get(i));
    const gi = Array.from(g.get(n - i));
    fi.sort((a, b) => a - b);
    gi.sort((a, b) => a - b);

    // Iterate through the sums of the first subset
    for (const a of fi) {
      let left = 0,
        right = gi.length - 1;
      const b = -a;

      // Use binary search to find closest sum in the second subset
      while (left < right) {
        const mid = (left + right) >> 1;

        if (gi[mid] >= b) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }

      // Update the minimum absolute difference between the sums
      ans = Math.min(ans, Math.abs(a + gi[left]));

      // Consider the previous element in the second subset
      if (left > 0) {
        ans = Math.min(ans, Math.abs(a + gi[left - 1]));
      }
    }
  }

  return ans;
}

// Test cases
console.log(minimumDifference([3, 9, 7, 3])); // Output: 2
console.log(minimumDifference([-36, 36])); // Output: 72
console.log(minimumDifference([2, -1, 0, 4, -2, -9])); // Output: 0
