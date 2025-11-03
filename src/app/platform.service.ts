import { Injectable } from '@angular/core';


 interface UserItems {
    userId: string,
    items: Item[]
  }

interface Item {
  id: string,
  source: string
}

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  userItems: UserItems = {
    userId: "kamp_nord", 
    items: [
      {
        id: "alma9992105508701488",
        source: "Primo"
      },
      {
        id: "alma9992119949801488",
        source: "Primo"
      },
      {
        id: "alma9928521790101488",
        source: "Primo"
      },
      {
        id: "alma9992341708001488",
        source: "Primo"
      },
      {
        id: "alma999647760101488",
        source: "Primo"
      },

    ]

  }
  constructor() { 

  }

  getItems() {
    return this.userItems;
  }


}
