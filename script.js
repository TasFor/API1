      // Funkcja do obsługi zgody na lokalizację
      function getLocationConsent() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              console.log("Latitude: " + position.coords.latitude);
              console.log("Longitude: " + position.coords.longitude);
            },
            function(error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
          );
        } else {
          alert("Geolocation API nie jest dostępne w twojej przeglądarce.");
        }
      }
      
      // Funkcja do obsługi zgody na powiadomienia
      function getNotificationConsent() {
        if (!("Notification" in window)) {
          alert("Ta przeglądarka nie wspiera powiadomień.");
        } else if (Notification.permission === "default") {
          Notification.requestPermission().then(permission => {
            if (permission === "granted") {
              new Notification("Dziękujemy za przyznanie zgody na powiadomienia!");
            }
          });
        }
      }
      
    
          let map = L.map("map").setView([53.430127, 14.564802], 18);
          L.tileLayer.provider("Esri.WorldImagery").addTo(map);
    
          document
            .getElementById("saveButton")
            .addEventListener("click", function () {
              leafletImage(map, function (err, canvas) {
                // here we have the canvas
                let rasterMap = document.getElementById("rasterMap");
                let rasterContext = rasterMap.getContext("2d");
    
                rasterContext.drawImage(canvas, 0, 0, 600, 300);
    
                puzzle();
              });
            });
    
          document
            .getElementById("getLocation")
            .addEventListener("click", function (event) {
              if (!navigator.geolocation) {
                console.log("No geolocation.");
              }
    
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  console.log(position);
                  let lat = position.coords.latitude;
                  let lon = position.coords.longitude;
    
                  map.setView([lat, lon]);
                },
                (positionError) => {
                  console.error(positionError);
                }
              );
            });
    
          function puzzle() {
            let rasterMap = document.getElementById("rasterMap");
            let rasterContext = rasterMap.getContext("2d");
    
            //let puzzleCanvas = document.getElementById("puzzle-elements");
            //let puzzleContex = puzzleCanvas.getContext("2d");
            //puzzleCanvas.width = rasterMap.width;
            //puzzleCanvas.height = rasterMap.height;
    
            //puzzleContex.drawImage(rasterMap, 0, 0);
    
            // Szerokość i wysokość pojedynczego elementu
            const elementWidth = rasterMap.width / 4;
            const elementHeight = rasterMap.height / 4;
    
            divPuzzle = document.getElementById("puzzle-elements");
            divPuzzle.addEventListener("dragenter", function (event) {});
            divPuzzle.addEventListener("dragleave", function (event) {});
            divPuzzle.addEventListener("dragover", function (event) {
              this.style.border = "none";
              event.preventDefault();
            });
            divPuzzle.addEventListener("drop", function (event) {
              let myElement = document.querySelector(
                "#" + event.dataTransfer.getData("text")
              );
              this.appendChild(myElement);
              this.style.border = "none";
            });
            let divSolve = document.getElementById("board");
            let dropContainer = document.getElementById("mapSolve"); // Dodaj dropContainer
            var draggedImage = null;
            for (let row = 0; row < 4; row++) {
              let divRow = document.getElementById("row" + row);
              for (let col = 0; col < 4; col++) {
                const sx = col * elementWidth;
                const sy = row * elementHeight;
                const sw = elementWidth;
                const sh = elementHeight;
    
                const elementId = `field${row}_${col}`;
    
                // Tworzymy nowy canvas dla pojedynczego elementu
                //let elementCanvas = document.createElement("canvas");
                let puzzleElements = [];
                let elementCanvas = document.createElement("div");
                elementCanvas.id = elementId;
                elementCanvas.width = elementWidth;
                elementCanvas.height = elementHeight;
                //let elementContext = elementCanvas.getContext("2d");
                elementCanvas.classList.add("puzzleSolve");
    
                //elementContext.fillStyle = "white";
                //elementContext.fillRect(0, 0, elementWidth, elementHeight);
    
                elementCanvas.addEventListener("dragenter", function (event) {
                  this.style.border = "none";
                });
                elementCanvas.addEventListener("dragleave", function (event) {
                  this.style.border = "1px solid black";
                });
                elementCanvas.addEventListener("dragover", function (event) {
                  this.style.border = "none";
                  event.preventDefault();
                });
                elementCanvas.addEventListener(
                  "drop",
                  function (event) {
                    let myElement = document.querySelector(
                      "#" + event.dataTransfer.getData("text")
                    );
                    if (this.children.length === 0) {
                      this.appendChild(myElement);
                      this.style.border = "none";
                      areAllPuzzlesInFields();
                    } else {
                      alert("pole nie jest puste!");
                    }
                  },
                  false
                );
    
                divRow.appendChild(elementCanvas);
              }
            }
    
            let puzzleElements = [];
    
            for (let row = 0; row < 4; row++) {
              for (let col = 0; col < 4; col++) {
                const sx = col * elementWidth;
                const sy = row * elementHeight;
                const sw = elementWidth;
                const sh = elementHeight;
                const dx = 0;
                const dy = 0;
                const dw = elementWidth;
                const dh = elementHeight;
    
                // Tworzymy nowy canvas dla pojedynczego elementu
    
                const elementId = `puzzle${row}_${col}`;
    
                let elementCanvas = document.createElement("canvas");
                elementCanvas.id = elementId;
                elementCanvas.width = elementWidth;
                elementCanvas.height = elementHeight;
                elementCanvas.setAttribute("draggable", "true");
                let elementContext = elementCanvas.getContext("2d");
    
                elementCanvas.addEventListener("dragstart", function (event) {
                  this.style.border = "none";
                  event.dataTransfer.setData("text", this.id);
                });
    
                elementCanvas.addEventListener("dragend", function (event) {
                  this.style.border = "none";
                });
    
                // Rysujemy fragment z głównego canvasa na pojedynczym elemencie
                elementContext.drawImage(rasterMap, sx, sy, sw, sh, dx, dy, dw, dh);
    
                puzzleElements.push(elementCanvas);
    
                //divPuzzle.appendChild(elementCanvas);
              }
            }
    
            shuffleArray(puzzleElements);
    
            divPuzzle.innerHTML = ""; // Usuwamy wszystkie istniejące elementy
    
            for (const puzzleElement of puzzleElements) {
              divPuzzle.appendChild(puzzleElement);
            }
          }
    

        function areAllPuzzlesInFields() {
            for (let row = 0; row < 4; row++) {
              for (let col = 0; col < 4; col++) {
                if (!isPuzzleInField(row, col)) {
                  console.log("Puzzle nieułożone");
                  return false;
                }
              }
            }
            console.log("Puzzle ułożone");
            const successMessage = "Gratulacje! Ułożyłeś puzzle poprawnie!";
            document.getElementById("successMessage").innerText = successMessage;
          
            // Sprawdzenie, czy zgoda na powiadomienia została udzielona
            if (Notification.permission === "granted") {
              new Notification("Puzzle Ułożone", { body: successMessage });
            }
          
            return true;
          }
    
          function isPuzzleInField(puzzleRow, puzzleCol) {
            const fieldId = `field${puzzleRow}_${puzzleCol}`;
            const puzzleId = `puzzle${puzzleRow}_${puzzleCol}`;
    
            const fieldElement = document.getElementById(fieldId);
            if (fieldElement) {
              const puzzleElement = fieldElement.querySelector(`#${puzzleId}`);
              return puzzleElement !== null;
            }
    
            return false;
          }
    
          function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
          }