import { Component } from './../models/Component';
import * as http from 'axios';
import { JSDOM } from 'jsdom';

export class HttpService {

constructor(private axios = http.default) { }

public async getComponents(): Promise<Component[]> {
    // Fetch the angular-material component lists from their github page
	let res = await this.axios.get("https://getbootstrap.com/docs/5.2/components/accordion/");
	// Get the html code
    let html = res.data;

    // Parse the html code
	let dom = new JSDOM(html);
    // Get all component "folders" from the html code
	let elements: Element[] = Array.from(
		dom.window.document.getElementsByClassName('bd-links-link d-inline-block rounded'),
		  );
    
    // Create a list with component objects
    let components: Component[] = [];
    
    elements.forEach(element => {
        let component: Component = {
            name: element.innerHTML,
            url: "https://getbootstrap.com" + element.getAttribute("href"),
        };

        components.push(component);

    });

    return components;

    // remove unwanted components such as legacy and files
}

}
