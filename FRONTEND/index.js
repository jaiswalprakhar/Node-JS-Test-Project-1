import { handleBookSubmit} from "./book.js";

const form = document.querySelector('form');

form.addEventListener('submit', handleBookSubmit);