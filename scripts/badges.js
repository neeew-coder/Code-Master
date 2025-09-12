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

  if (subject === "javascript") {
        if (percent === 100) return { label: "async overlord", class: "bg-green-600", icon: "fa-infinity" };
        if (percent >= 75) return { label: "promise pilot", class: "bg-purple-600", icon: "fa-rocket" };
        if (percent >= 50) return { label: "callback captain", class: "bg-blue-500", icon: "fa-sync-alt" };
        if (percent >= 25) return { label: "event wrangler", class: "bg-yellow-400", icon: "fa-mouse-pointer" };
        return { label: "function fledgling", class: "bg-gray-400", icon: "fa-bolt" };
 }

  if (subject === "java") {
        if (percent === 100) return { label: "runtime ruler", class: "bg-green-600", icon: "fa-cogs" };
        if (percent >= 75) return { label: "inheritance initiator", class: "bg-purple-600", icon: "fa-project-diagram" };
        if (percent >= 50) return { label: "object operator", class: "bg-blue-500", icon: "fa-object-group" };
        if (percent >= 25) return { label: "method mapper", class: "bg-yellow-400", icon: "fa-code-branch" };
        return { label: "class crawler", class: "bg-gray-400", icon: "fa-cube" };
 }

 if (subject === "csharp") {
    if (percent === 100) return { label: "runtime regent", class: "bg-green-600", icon: "fa-cogs" };
    if (percent >= 75) return { label: "LINQ luminary", class: "bg-purple-600", icon: "fa-filter" };
    if (percent >= 50) return { label: "delegate dominator", class: "bg-blue-500", icon: "fa-bolt" };
    if (percent >= 25) return { label: "interface initiator", class: "bg-yellow-400", icon: "fa-puzzle-piece" };
    return { label: "namespace newbie", class: "bg-gray-400", icon: "fa-cube" };
 }


  // fallback for other subjects
  if (percent === 100) return { label: "Master", class: "bg-green-600" };
  if (percent >= 75) return { label: "Expert", class: "bg-purple-600" };
  if (percent >= 50) return { label: "Achiever", class: "bg-blue-500" };
  if (percent >= 25) return { label: "Learner", class: "bg-yellow-400" };
  return { label: "Rookie", class: "bg-gray-300" };
}
