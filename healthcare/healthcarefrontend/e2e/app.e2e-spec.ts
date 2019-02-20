/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for healthcarefrontend', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be healthcarefrontend', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('healthcarefrontend');
    })
  });

  it('network-name should be healthcare@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('healthcare@0.0.1.bna');
    });
  });

  it('navbar-brand should be healthcarefrontend',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('healthcarefrontend');
    });
  });

  
    it('Patient_profile component should be loadable',() => {
      page.navigateTo('/Patient_profile');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Patient_profile');
      });
    });

    it('Patient_profile table should have 8 columns',() => {
      page.navigateTo('/Patient_profile');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('Doctor_profile component should be loadable',() => {
      page.navigateTo('/Doctor_profile');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Doctor_profile');
      });
    });

    it('Doctor_profile table should have 10 columns',() => {
      page.navigateTo('/Doctor_profile');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('Patient component should be loadable',() => {
      page.navigateTo('/Patient');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Patient');
      });
    });

    it('Patient table should have 5 columns',() => {
      page.navigateTo('/Patient');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Medical_Record component should be loadable',() => {
      page.navigateTo('/Medical_Record');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Medical_Record');
      });
    });

    it('Medical_Record table should have 10 columns',() => {
      page.navigateTo('/Medical_Record');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Doctor component should be loadable',() => {
      page.navigateTo('/Doctor');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Doctor');
      });
    });

    it('Doctor table should have 2 columns',() => {
      page.navigateTo('/Doctor');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(2); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('UpdateRecord component should be loadable',() => {
      page.navigateTo('/UpdateRecord');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('UpdateRecord');
      });
    });
  
    it('AllowOtherDoctorsRead component should be loadable',() => {
      page.navigateTo('/AllowOtherDoctorsRead');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AllowOtherDoctorsRead');
      });
    });
  
    it('AllowAdoctorWrite component should be loadable',() => {
      page.navigateTo('/AllowAdoctorWrite');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('AllowAdoctorWrite');
      });
    });
  

});