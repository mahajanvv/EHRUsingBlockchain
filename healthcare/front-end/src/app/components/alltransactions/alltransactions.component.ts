import { Component, OnInit } from '@angular/core';
import { CommonserviceService } from '../../services/commonservice.service';
@Component({
  selector: 'app-alltransactions',
  templateUrl: './alltransactions.component.html',
  styleUrls: ['./alltransactions.component.css']
})
export class AlltransactionsComponent implements OnInit {

  private transactionslist : [];
  constructor(private commonservice : CommonserviceService) { }

  ngOnInit() {
    this.commonservice.getHistoricalTransactions().subscribe(
      data => {
        this.transactionslist = data;
        console.log(this.transactionslist);
      },
      error => {
        console.log(error);
      }
    );
    
  }

}
