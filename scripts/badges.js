function getBadgeInfo(percent) {
  if (subject === "html") {
    if (percent === 100) return { label: "<html hero>", class: "bg-green-600" };
    if (percent >= 75) return { label: "<form fluent>", class: "bg-purple-600" };
    if (percent >= 50) return { label: "<article author>", class: "bg-blue-500" };
    if (percent >= 25) return { label: "<section starter>", class: "bg-yellow-400" };
    return { label: "<div dabbler>", class: "bg-gray-400" };
  }

  if (subject === "css") {
    if (percent === 100) return { label: ".style sorcerer", class: "bg-green-600" };
    if (percent >= 75) return { label: ".grid guru", class: "bg-purple-600" };
    if (percent >= 50) return { label: ".flexbox fighter", class: "bg-blue-500" };
    if (percent >= 25) return { label: ".box-model builder", class: "bg-yellow-400" };
    return { label: ".selector scout", class: "bg-gray-400" };
  }

  // fallback for other subjects
  if (percent === 100) return { label: "Master", class: "bg-green-600" };
  if (percent >= 75) return { label: "Expert", class: "bg-purple-600" };
  if (percent >= 50) return { label: "Achiever", class: "bg-blue-500" };
  if (percent >= 25) return { label: "Learner", class: "bg-yellow-400" };
  return { label: "Rookie", class: "bg-gray-300" };
}
