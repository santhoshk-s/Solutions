function virusIndices(p, v) { // p equals to patient DNA and v equals to virus DNA
  const result = [] // I initialized an empty array to store the starting indices of the matching substring
    const pLength = p.length // Length of patient DNA
    const vLength = v.length//length of Virus DNA
  
    for (let i = 0; i <= pLength - vLength; i++) {   // Outer loop iterates through the patient DNA ensuring each substring is compred is same length as the virus DNA
      let mismatchCount = 0 //  mismatch initialized
      for (let j = 0; j < vLength; j++) {
        if (p[i + j] !== v[j]) { //inner loop compare the current substring of the pation DNA with the virus DNA 
          mismatchCount++//if mismatch found , incremented by 1
          if (mismatchCount > 1) break
        }
      }
      if (mismatchCount === 0 || mismatchCount === 1) { // if it is equal to 0,1 that index i is added to the result array
        result.push(i)
      }
    }
  
    if (result.length === 0) { // check for length if zero it retur No Match!
      return "No Match!"
    } else {
      return result.join(" ") // finally return the result array
    }
  }
  
  // Test cases
console.log(virusIndices("abbab", "ba")) 
console.log(virusIndices("hello", "world"))
console.log(virusIndices("banana", "nan"))
console.log(virusIndices("cgatcg", "gc"))
console.log(virusIndices("atcgatcga", "cgg"))
console.log(virusIndices("aardvark", "ab"))

  //Example test cases
console.log(  virusIndices("santhosh","kumar"))
console.log(  virusIndices("zeksta","technology"))

/*Time complexity is O(N * M) and the space complexity is O(K) or O(N) in the worst case. */