    // auto-populating Hunt Type dropdown
      function populateHuntTypeDropdown() {
        google.script.run.withSuccessHandler(function(options) {
          var huntTypeDropdown = document.getElementById('huntType');
          options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            huntTypeDropdown.appendChild(optionElement);
          });
        }).getHuntTypeOptions();
      }

      // auto-populating Device Name dropdown
      function populateDeviceNameDropdown() {
        google.script.run.withSuccessHandler(function(options) {
          var deviceNameDropdown = document.getElementById('deviceName');
          options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            deviceNameDropdown.appendChild(optionElement);
          });
        }).getDeviceNameOptions();
      }

      // auto-populating Communicated Offer dropdown
      function populateCommunicatedOfferDropdown() {
        google.script.run.withSuccessHandler(function(options) {
          var communicatedOfferDropdown = document.getElementById('communicatedOffer');
          options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            communicatedOfferDropdown.appendChild(optionElement);
            console.log(communicatedOfferDropdown.value);
          });
        }).getCommunicatedOfferOptions();
      }

      // auto-populating Territory Name dropdown
      function populateTerritoryNameDropdown() {
        google.script.run.withSuccessHandler(function(options) {
          var territoryNameDropdown = document.getElementById('territoryName');
          options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            territoryNameDropdown.appendChild(optionElement);
          });
        }).getTerritoryNameOptions();
      }

      // When technician selects an offer which contains the word "Referral"
      // then the Referrer Mobile Numer field will be mandatory otherwise it remains optional
      function toggleReferralMobile() {
        var communicatedOfferDropdown = document.getElementById('communicatedOffer');
        var referralMobileInput = document.getElementById('referralMobile');

        // Regular expression to match variations of the word "referral"
        // var referralRegex = /ref(?:erral|r(?:efer|eferer))?\b/i;

        if (communicatedOfferDropdown.value.includes('Referral')) {
          referralMobileInput.required = true;
        } else {
          referralMobileInput.required = false;
        }
        console.log(referralMobileInput.required)
      }

      document.getElementById('communicatedOffer').addEventListener('change', toggleReferralMobile);

      // auto-populating LSP Name dropdown based on the value selected in the Territory Name dropown
      function populateLSPNameDropdown() {
        var territoryNameDropdown = document.getElementById('territoryName');
        var selectedTerritory = territoryNameDropdown.value;
        var lspNameDropdown = document.getElementById('lspName');
        lspNameDropdown.innerHTML = ''; // Clear existing options

        if (selectedTerritory) {
          google.script.run.withSuccessHandler(function(options) {
            options.forEach(function(option) {
              var optionElement = document.createElement('option');
              optionElement.value = option;
              optionElement.textContent = option;
              console.log(optionElement.value);
              lspNameDropdown.appendChild(optionElement);
            });
          }).getLSPNameOptions(selectedTerritory);
        } 
      }

      // call populateLSPNameDropdown when the value of the Territory dropdown changes
      document.getElementById('territoryName').addEventListener('change', populateLSPNameDropdown);



      function populateThanaDropdown() {
        var lspNameDropdown = document.getElementById('lspName');
        var selectedLSPName = lspNameDropdown.value;
        var thanaNameDropdown = document.getElementById('thanaName');
        thanaNameDropdown.innerHTML = ''; // Clear existing options
        
        // Get the selected LSP Name from the dropdown
        var selectedLSPName = lspNameDropdown.value;

        console.log(selectedLSPName)

        if (selectedLSPName) {
          google.script.run.withSuccessHandler(function(options) {
            options.forEach(function(option) {
              var optionElement = document.createElement('option');
              optionElement.value = option;
              optionElement.textContent = option;
              console.log(optionElement.value);
              thanaNameDropdown.appendChild(optionElement);
            });
          }).getThanaNameOptions(selectedLSPName);
        }
      }

      // Call populateThanaDropdown when the value of the LSP Name dropdown changes
      document.getElementById('lspName').addEventListener('change', populateThanaDropdown);

      // auto-populating TL Name dropdown
      function populateTLNameDropdown() {
        google.script.run.withSuccessHandler(function(options) {
          var tlNameDropdown = document.getElementById('tlName');
          options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            tlNameDropdown.appendChild(optionElement);
          });
        }).getTLNameOptions();
      }

    
      // call the functions for auto-populating dropdowns when the page loads
      window.onload = function() {
        populateHuntTypeDropdown();
        populateDeviceNameDropdown();
        populateCommunicatedOfferDropdown();
        populateTerritoryNameDropdown();
        populateLSPNameDropdown();
        populateThanaDropdown();
        populateTLNameDropdown();
      };


      function submitForm() {
        var year = document.getElementById('year').value;
        var month = document.getElementById('month').value;
        var huntType = document.getElementById('huntType').value;
        var consumerName = document.getElementById('consumerName').value;
        var consumerMobileNumber = document.getElementById('consumerMobile').value;
        var consumerAddress = document.getElementById('consumerAddress').value;
        var deviceName = document.getElementById('deviceName').value;
        var quantity = document.getElementById('quantity').value;
        var communicatedOffer = document.getElementById('communicatedOffer').value;
        var referralMobileNumber = document.getElementById('referralMobile').value;
        var appointmentDateTime = document.getElementById('appointmentDateTime').value;
        var territoryName = document.getElementById('territoryName').value;
        var lspName = document.getElementById('lspName').value;
        var thanaName = document.getElementById('thanaName').value;
        var tlName = document.getElementById('tlName').value;
        var technicianName = document.getElementById('technicianName').value;
        var technicianRemarks = document.getElementById('technicianRemarks').value;
        // Collect other form data similarly

        consumerMobileNumber = "88" + consumerMobileNumber;
        if (referralMobileNumber) {
          referralMobileNumber = "88" + referralMobileNumber;
        } else{
          referralMobileNumber = ''
        }

        // Call server-side function to submit form data
        google.script.run.submitFormData(year, month, huntType, consumerName, consumerMobileNumber, consumerAddress, deviceName, quantity, communicatedOffer, referralMobileNumber, appointmentDateTime, territoryName, lspName, thanaName, tlName, technicianName, technicianRemarks);
        
        // Disable the submit button to prevent multiple submissions
        var submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;

        // Simulate form submission (replace this with your actual submission logic)
        setTimeout(function() {
          // Enable the submit button
          submitButton.disabled = false;

          // Show submission success message
          alert("Submission Successful");

          // Reload the page to allow for another submission
          location.reload();
        }, 1000); // Simulate a delay of 1 second for submission
      }
