function checkStrongPassword(password) {
  let missingTypes = 3;
  let lowercaseMissing = true,
    uppercaseMissing = true,
    digitMissing = true;
  let repeating = 0; // Counts the groups of repeating characters
  let steps = 0;
  let overLength = Math.max(password.length - 20, 0); // stores excess length beyond 20 characters

  // Loop through the password characters to count repeating characters and missing types
  for (let i = 0; i < password.length; ) {
    const curr = password[i];

    // Check for repeating characters (sequences of 3 or more)
    if (
      i < password.length - 2 &&
      password[i + 1] === curr &&
      password[i + 2] === curr
    ) {
      // Found a sequence of repeating characters, calculate the groups of 3 characters
      let repeatLength = 2; // Initialize the length of the repeating sequence
      while (
        i + repeatLength < password.length &&
        password[i + repeatLength] === curr
      )
        repeatLength++;
      repeating += Math.floor(repeatLength / 3); // Add the count of repeating sequences to 'repeating'
      i += repeatLength; // Move the index to skip the repeating sequence
    } else {
      // Character is not part of a repeating sequence, check for missing types
      if (/[a-z]/.test(curr)) lowercaseMissing = false;
      if (/[A-Z]/.test(curr)) uppercaseMissing = false;
      if (/\d/.test(curr)) digitMissing = false;
      i++; // Move to the next character
    }
  }

  // Evaluate steps required based on password length and character types
  if (password.length < 6) {
    steps = Math.max(missingTypes, 6 - password.length);
  } else {
    if (password.length > 20) {
      steps = overLength; // Excess length beyond 20 characters is already counted as steps
      const deleteCount = overLength;

      // Update repeating count to manage excess length (deleteCount)
      repeating = Math.max(repeating - overLength, 0); // Adjust repeating character count
      steps += Math.floor(deleteCount / 3); // Deleting 3 characters reduces steps by 1
    }

    // Calculate missing types considering the flags and add to steps
    missingTypes =
      (lowercaseMissing ? 1 : 0) +
      (uppercaseMissing ? 1 : 0) +
      (digitMissing ? 1 : 0);
    steps += Math.max(missingTypes, repeating); // Add missing types or repeating characters to steps
  }

  // Return the total steps required to make the password strong
  return steps;
}

// Unit tests
console.log(checkStrongPassword("a")); // Output: 5
console.log(checkStrongPassword("aA1")); // Output: 3
console.log(checkStrongPassword("1337C0d3")); // Output: 0
