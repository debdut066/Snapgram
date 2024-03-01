import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertFileToUrl (file){
  return URL.createObjectURL(file)
}

export function formatDateString(dateString){
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${formattedDate} at ${time}`;
}

export function multiFormatDateString(timestamp){
  const timestampNum = Math.round(new Date(timestamp).getTime()/1000);
  const date = new Date(timestampNum*1000);
  const now = new Date();

  const diff = now.getTime()-date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch(true){
    case Math.floor(diffInDays) >= 30 : 
      return formatDateString(timestamp);

    case Math.floor(diffInDays) === 1 :
      return `${Math.floor(diffInDays)} day ago`;

    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} days ago`;

    case Math.floor(diffInHours) >= 1 :
      return `${Math.floor(diffInHours)} hours ago`;
    
    case Math.floor(diffInMinutes) >= 1 :
      return `${Math.floor(diffInMinutes)} minutes ago`;

    default : 
      return "Just now"
  }
  
}

export function checkedIsLiked(likeList, userId){
  return likeList.includes(userId)
}

export function formatTimestamp(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) {
      return years + (years === 1 ? "yr" : "yrs");
  } else if (months >= 1) {
      return months + (months === 1 ? "m" : "m");
  } else if (weeks >= 1) {
      return weeks + (weeks === 1 ? "w" : "wk");
  } else if (days >= 1) {
      return days + (days === 1 ? "d" : "d");
  } else if (hours >= 1) {
      return hours + (hours === 1 ? "hr" : "hrs");
  } else if (minutes >= 1) {
      return minutes + (minutes === 1 ? "min" : "mins");
  } else {
      return seconds + "s";
  }
}