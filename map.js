
    
    require([
      // ArcGIS
      "esri/Map",
      "esri/views/MapView",
      "esri/views/SceneView",
      "esri/layers/FeatureLayer",
      "esri/layers/MapImageLayer",
      "esri/layers/GroupLayer",
      "esri/core/watchUtils",
      // Widgets
      "esri/widgets/Home",
      "esri/widgets/Zoom",
      "esri/widgets/Compass",
      "esri/widgets/Search",
      "esri/widgets/Legend",
      "esri/widgets/Sketch/SketchViewModel",
      "esri/widgets/BasemapToggle",
      "esri/widgets/ScaleBar",
      "esri/widgets/Attribution",
      "esri/widgets/LayerList",
      "esri/widgets/Locate",
      "esri/widgets/NavigationToggle",
      "esri/layers/GraphicsLayer",
      "esri/symbols/SimpleFillSymbol",
      "esri/Graphic",
      "esri/tasks/support/FeatureSet",
      //DGrid
      "dstore/Memory",
      "dojo/data/ObjectStore",
      "dojo/data/ItemFileReadStore",
      "dojox/grid/DataGrid",
      "dgrid/OnDemandGrid",
      "dgrid/Selection",
      "dgrid/List",
      // Bootstrap
      "bootstrap/Collapse",
      "bootstrap/Dropdown",
      // Calcite Maps
      "calcite-maps/calcitemaps-v0.9",
      
      // Calcite Maps ArcGIS Support
      "calcite-maps/calcitemaps-arcgis-support-v0.9",
      "dojo/query",
      "dojo/domReady!"
    ], function(Map, MapView, SceneView, FeatureLayer, MapImageLayer, GroupLayer, watchUtils, Home, Zoom, Compass, Search, Legend, SketchViewModel, BasemapToggle, ScaleBar, Attribution, LayerList, Locate, NavigationToggle, GraphicsLayer, SimpleFillSymbol, Graphic, FeatureSet, Memory, ObjectStore, ItemFileReadStore, DataGrid, OnDemandGrid, Selection, List, Collapse, Dropdown, CalciteMaps, CalciteMapArcGISSupport, query) {
      /******************************************************************
       *
       * Create the map, view and widgets
       * 
       ******************************************************************/
      // Map
      var map = new Map({
                basemap: "hybrid",
                //ground: "world-elevation",
            });
      
      // View
      var mapView = new MapView({
                container: "mapViewDiv",
                map: map,
                center: [-112, 39.5],
                zoom: 8,
                padding: {
                    top: 50,
                    bottom: 0
                },
                ui: {
                    components: []
                }
            });
      // Popup and panel sync
      mapView.when(function(){
        CalciteMapArcGISSupport.setPopupPanelSync(mapView);
      });
      // Search - add to navbar
      var searchWidget = new Search({
        container: "searchWidgetDiv",
        view: mapView
      });
      CalciteMapArcGISSupport.setSearchExpandEvents(searchWidget);
      // Map widgets
      var home = new Home({
        view: mapView
      });
      mapView.ui.add(home, "top-left");
      var zoom = new Zoom({
        view: mapView
      });
      mapView.ui.add(zoom, "top-left");
      var compass = new Compass({
        view: mapView
      });
      mapView.ui.add(compass, "top-left");
      
      var basemapToggle = new BasemapToggle({
        view: mapView,
        secondBasemap: "satellite"
      });

      // geolocate user position
      var locateWidget = new Locate({
        view: mapView,   // Attaches the Locate button to the view
      });

mapView.ui.add(locateWidget, "top-left");

var tempGraphic = null;          
            let editGraphic;
            // GraphicsLayer to hold graphics created via sketch view model
            const tempGraphicsLayer = new GraphicsLayer({
                listMode: "hide",
            });



 //popup templates for all layers

 studyAreasPopup = function(feature) {
     console.log(feature);
                var contentS = "";


                        contentS += "<span class='bold' title='Name'><b>Name: </b></span>{Name}<br/>";


                        contentS += "<span class='bold' title='Report ID'><b>Report ID: </b></span>{Repor_ID}<br/>";

 
                        var hazardsString = feature.graphic.attributes.Hazard_Name;
                        var hazArray = hazardsString.split(',');
                        contentS += "<span class='bold' title='Mapped Hazards'><b>Mapped Hazards: </b></span><br/>";
                        hazArray.forEach(studyPopupContent);
                        function studyPopupContent(item, index) {
                            contentS += "&nbsp;&nbsp;• " + item + "<br/>";

                }
                return contentS;
            }



            epicentersPopup = function(feature) {
                console.log(feature);
                var content = "";


                        content += "<span class='bold' title='Magnitude'><b>Magnitude: </b></span>{Mag}<br/>";

 
                     content += "<span class='bold' title='Longitude'><b>Longitude: </b></span>{Long}<br/>";

                        content += "<span class='bold' title='Latitude'><b>Latitude: </b></span>{Lat}<br/>";


                        content += "<span class='bold' title='Depth'><b>Depth: </b></span>{Depth} Km <br/>";

                         content += "<span class='bold' title='Date'><b>Date: </b></span>{Date}<br/>";

                return content;
            }

            miningepicentersPopup = function(feature) {
                var content = "";
 
                        content += "<span class='bold' title='Magnitude'><b>Magnitude: </b></span>{Mag}<br/>";

                        content += "<span class='bold' title='Longitude'><b>Longitude: </b></span>{Long}<br/>";

                        content += "<span class='bold' title='Latitude'><b>Latitude: </b></span>{Lat}<br/>";

                        content += "<span class='bold' title='Depth'><b>Depth: </b></span>{Depth} Km <br/>";

                        content += "<span class='bold' title='Date'><b>Date: </b></span>{Date}<br/>";

                return content;
            }

            qfaultsPopup = function(feature) {
                console.log(feature);
                var content = "";
                    if (feature.graphic.attributes.FaultNum) {
                        content += "<span class='bold' title='Magnitude'><b>Fault Number: </b></span>{FaultNum}<br/>";
                    }
                    if (feature.graphic.attributes.FaultZone) {
                        content += "<span class='bold' title='Longitude'><b>Fault Zone: </b></span>{FaultZone}<br/>";
                    }
                    if (feature.graphic.attributes.FaultName) {
                        content += "<span class='bold' title='Latitude'><b>Fault Name: </b></span>{FaultName}<br/>";
                    }
                    if (feature.graphic.attributes.SectionName) {
                        content += "<span class='bold' title='Depth'><b>Section Name: </b></span>{SectionName}<br/>";
                    }
                    if (feature.graphic.attributes.StrandName) {
                        content += "<span class='bold' title='Date'><b>Strand Name: </b></span>{StrandName}<br/>";
                    }
                    if (feature.graphic.attributes.MappedScale) {
                        content += "<span class='bold' title='Date'><b>Mapped Scale: </b></span>{MappedScale}<br/>";
                    }
                    if (feature.graphic.attributes.DipDirection) {
                        content += "<span class='bold' title='Date'><b>Dip Direction: </b></span>{DipDirection}<br/>";
                    }
                    if (feature.graphic.attributes.SlipSense) {
                        content += "<span class='bold' title='Date'><b>Slip Sense: </b></span>{SlipSense}<br/>";
                    }
                    if (feature.graphic.attributes.SlipRate) {
                        content += "<span class='bold' title='Date'><b>Slip Rate: </b></span>{SlipRate}<br/>";
                    }
                    if (feature.graphic.attributes.MappingConstraint) {
                        content += "<span class='bold' title='Date'><b>Mapping Constraint: </b></span>{MappingConstraint}<br/>";
                    }
                var slipS = feature.graphic.attributes.SlipSense;

                        if (slipS == "Normal") {
                            content += "<span class='bold' title='Date'><b>Fault Class: </b></span>{FaultClass}<br/>";
                        }
                        else if (slipS == "Reverse") {
                            content += "<span class='bold' title='Date'><b>Fault Class: </b></span>{FaultClass}<br/>";   
                        }
                        else {
                            content += "<span class='bold' title='Date'><b>Fold Class: </b></span>{FaultClass}<br/>";
                        }



                        if (slipS == "Normal") {
                            content += "<span class='bold' title='Date'><b>Fault Age: </b></span>{FaultAge}<br/>";
                        }
                        else if (slipS == "Reverse") {
                            content += "<span class='bold' title='Date'><b>Fault Age: </b></span>{FaultAge}<br/>";   
                        }
                        else {
                            content += "<span class='bold' title='Date'><b>Fold Age: </b></span>{FaultAge}<br/>";
                        }

                if (feature.graphic.attributes.USGS_Link) {
                        content += "<span class='bold' title='Date'><b>USGS Link: </b></span>" + "<a href='{USGS_Link}' target='_blank'>Opens in new tab</a>" + "<br/>";
                }
                return content;
            }



            fchPopup = function(feature) {
                var content = "";

                
                    if (feature.graphic.attributes.FCHMappedScale) { 
                        content += "<span class='bold' title='Longitude'><b>Mapped Scale: </b></span>{FCHMappedScale}<br/>";
                    
                    }
                return content;
            }

            lssPopup = function(feature) {
                console.log(feature);
                var content = "";

                content += "<span class='bold' title='Longitude'><b>Description: </b></span>{relationships/3/Description}<br/>";

                        content += "<span class='bold' title='Longitude'><b>Mapped Scale: </b></span>{LSSMappedScale}<br/>";
 
                        content += "<span class='bold' title='Longitude'><b>Critical Angle: </b></span>{LSSCriticalAngle}<br/>";
  
                return content;
            }

            landslideSourcePopup = function(feature) {
                console.log(feature);
                var content = "";

                // if (key === "category") {
                //     if (data.category) { 
                //         content += "<span class='bold' title='Longitude'><b>category: </b></span>" + data.category + "<br/>";
                //     }
                // }
                // if (key === "d_material") {
                //     if (data.d_material) { 
                //         content += "<span class='bold' title='Longitude'><b>d_material: </b></span>" + data.d_material + "<br/>";
                //     }
                // }
                // if (key === "d_move_type") {
                //     if (data.d_move_type) { 
                //         content += "<span class='bold' title='Longitude'><b>d_material: </b></span>" + data.d_material + "<br/>";
                //     }
                // }
                // if (key === "d_name") {
                //     if (data.d_name) { 
                //         content += "<span class='bold' title='Longitude'><b>d_name: </b></span>" + data.d_name + "<br/>";
                //     }
                // }
                // if (key === "d_thickness") {
                //     if (data.d_thickness) { 
                //         content += "<span class='bold' title='Longitude'><b>d_thickness: </b></span>" + data.d_thickness + "<br/>";
                //     }
                // }
                // if (key === "d_move_dir") {
                //     if (data.d_move_dir) { 
                //         content += "<span class='bold' title='Longitude'><b>d_move_dir: </b></span>" + data.d_move_dir + "<br/>";
                //     }
                // }
                // if (key === "d_landform") {
                //     if (data.d_landform) { 
                //         content += "<span class='bold' title='Longitude'><b>d_landform: </b></span>" + data.d_landform + "<br/>";
                //     }
                // }

                    if (feature.graphic.attributes.s_name) { 
                        content += "<span class='bold' title='Longitude'><b>Name: </b></span>{s_name}<br/>";
                    }
                

                    if (feature.graphic.attributes.activity) { 
                        content += "<span class='bold' title='Longitude'><b>Activity: </b></span>{activity}<br/>";
                    }
                

                    if (feature.graphic.attributes.confidence) { 
                        content += "<span class='bold' title='Longitude'><b>Confidence: </b></span>{confidence}<br/>";
                    }
                

                    if (feature.graphic.attributes.comments) { 
                        content += "<span class='bold' title='Longitude'><b>Comments: </b></span>{comments}<br/>";
                    }
                
                // if (key === "feature_id") {
                //     if (data.feature_id) { 
                //         content += "<span class='bold' title='Longitude'><b>feature_id: </b></span>" + data.feature_id + "<br/>";
                //     }
                // }
                // if (key === "rev_date") {
                //     if (data.rev_date) { 
                //         content += "<span class='bold' title='Longitude'><b>rev_date: </b></span>" + data.rev_date + "<br/>";
                //     }
                // }

                    if (feature.graphic.attributes.d_h_move1) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 1: </b></span>{data.d_h_move1}<br/>";
                    }
                

                    if (feature.graphic.attributes.d_h_move2) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 2: </b></span>{data.d_h_move2}<br/>";
                    }
                

                    if (feature.graphic.attributes.d_h_move3) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 3: </b></span>{data.d_h_move3}<br/>";
                    }
                

                    if (feature.graphic.attributes.d_geologic_unit1) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Geologic Unit 1: </b></span>{d_geologic_unit1}<br/>";
                    }
                

                    if (feature.graphic.attributes.d_geologic_unit2) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Geologic Unit 2: </b></span>{d_geologic_unit2}<br/>";
                    }
                
                return content;
            }

landslideDepositPopup = function(feature) {
                var content = "";

                // if (key === "category") {
                //     if (data.category) { 
                //         content += "<span class='bold' title='Longitude'><b>category: </b></span>" + data.category + "<br/>";
                //     }
                // }

                    if (feature.graphic.attributes.d_material) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Material: </b></span>{d_material}<br/>";
                    }
                
      
                    if (feature.graphic.attributes.d_move_type) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement Type: </b></span>{d_move_type}<br/>";
                    }
                
          
                    if (feature.graphic.attributes.d_name) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Name: </b></span>{d_name}<br/>";
                    }
                
        
                    if (feature.graphic.attributes.d_thickness) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Thickness: </b></span>{d_thickness}<br/>";
                    }
         
                    if (feature.graphic.attributes.d_move_dir) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement Direction: </b></span>{d_move_dir}<br/>";
                    }
                
        
                    if (feature.graphic.attributes.d_landform) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Landform: </b></span>{d_landform}<br/>";
                    }
                
    
                    if (feature.graphic.attributes.s_name) { 
                        content += "<span class='bold' title='Longitude'><b>Source Name: </b></span>{s_name}<br/>";
                    }
                    if (feature.graphic.attributes.activity) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Activity: </b></span>{activity}<br/>";
                    }
                
      
                    if (feature.graphic.attributes.confidence) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Mapping Confidence: </b></span>{confidence}<br/>";
                    }
                
      
                    if (feature.graphic.attributes.comments) { 
                        content += "<span class='bold' title='Longitude'><b>Comments: </b></span>{comments}<br/>";
                    }
                
                // if (key === "feature_id") {
                //     if (data.feature_id) { 
                //         content += "<span class='bold' title='Longitude'><b>feature_id: </b></span>{feature_id}<br/>";
                //     }
                // }
                // if (key === "rev_date") {
                //     if (data.rev_date) { 
                //         content += "<span class='bold' title='Longitude'><b>rev_date: </b></span>{rev_date}<br/>";
                //     }
                // }
         
                    if (feature.graphic.attributes.d_h_move1) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 1: </b></span>{d_h_move1}<br/>";
                    }
                
           
                    if (feature.graphic.attributes.d_h_move2) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 2: </b></span>{d_h_move2}<br/>";
                    }
                
         
                    if (feature.graphic.attributes.d_h_move3) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Movement 3: </b></span>{d_h_move3}<br/>";
                    }
                
            
                    if (feature.graphic.attributes.d_geologic_unit1) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Geologic Unit 1: </b></span>{d_geologic_unit1}<br/>";
                    }
                
          
                    if (feature.graphic.attributes.d_geologic_unit2) { 
                        content += "<span class='bold' title='Longitude'><b>Deposit Geologic 2: </b></span>{d_geologic_unit2}<br/>";
                    }
                
                return content;
            }

            landslideCompPopup = function(feature) {
                console.log(feature);
                var content = "";

                
                    if (feature.graphic.attributes.StateLSID) { 
                        content += "<span class='bold' title='Longitude'><b>State Landslide ID: </b></span>{StateLSID}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.LSUnit) { 
                        content += "<span class='bold' title='Longitude'><b>Landslide Unit: </b></span>{LSUnit}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.MoveType != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Movement Type: </b></span>{MoveType}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.Historical != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Historical: </b></span>{Historical}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.GeolUnit) { 
                        content += "<span class='bold' title='Longitude'><b>Geologic Unit: </b></span>{GeolUnit}<br/>";
                    }
                
               
                    if (feature.graphic.attributes.MapScale) { 
                        content += "<span class='bold' title='Longitude'><b>Map Scale: </b></span>{MapScale}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.MapName) { 
                        content += "<span class='bold' title='Longitude'><b>Map Name: </b></span>{MapName}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.PubDate) { 
                        content += "<span class='bold' title='Longitude'><b>Pub Date: </b></span>{PubDate}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.Author_s) { 
                        content += "<span class='bold' title='Longitude'><b>Author(s): </b></span>{Author_s}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.AffUnit != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Affiliated Unit: </b></span>{AffUnit}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.MoveUnit != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Movement Unit: </b></span>{MoveUnit}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.MoveCause != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Movement Cause: </b></span>{MoveCause}<br/>";
                    }
                
                
                    if (feature.graphic.attributes.Notes != " ") { 
                        content += "<span class='bold' title='Longitude'><b>Notes: </b></span>{Notes}<br/>";
                    }
                
                return content;
            }



    var recentSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: "red",
        outline: { // autocasts as new SimpleLineSymbol()
          color: "black",
          width: 0.5,
        }
      };

      var rendererRecent = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: recentSym,
        visualVariables: [{
          type: "size",
          field: "Mag",
          legendOptions: {
            title: "Magnitude"
          },
          stops: [
          {
            value: 2.9,
            size: 4,
            label: "<2.9"
          },
          {
            value: 3.4,
            size: 8,
            label: "2.9 - 3.4"
          },
          {
            value: 3.9,
            size: 12,
            label: "3.5 - 3.9"
          },
          {
            value: 4.9,
            size: 18,
            label: "4.0 - 4.9"
          },
          {
            value: 5.9,
            size: 26,
            label: "5.0 - 5.9"
          },
          {
            value: 6.9,
            size: 36,
            label: "6.0 - 6.9"
          }]
        }]
      };

        var historicSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: "pink",
        outline: { // autocasts as new SimpleLineSymbol()
          color: "black",
          width: 0.5,
        }
      };

      var rendererHistoric = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: historicSym,
        visualVariables: [{
          type: "size",
          field: "Mag",
          legendOptions: {
            title: "Magnitude"
          },
          stops: [
          {
            value: 2.9,
            size: 4,
            label: "<2.9"
          },
          {
            value: 3.4,
            size: 8,
            label: "2.9 - 3.4"
          },
          {
            value: 3.9,
            size: 12,
            label: "3.5 - 3.9"
          },
          {
            value: 4.9,
            size: 18,
            label: "4.0 - 4.9"
          },
          {
            value: 5.9,
            size: 26,
            label: "5.0 - 5.9"
          },
          {
            value: 6.9,
            size: 36,
            label: "6.0 - 6.9"
          }]
        }]
      };

      var miningSym = {
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        //color: "pink",
        outline: { // autocasts as new SimpleLineSymbol()
          color: "black",
          width: 0.5,
        }
      };

      var rendererMining = {
        type: "simple", // autocasts as new SimpleRenderer()
        symbol: miningSym,
        visualVariables: [{
          type: "size",
          field: "Mag",
          legendOptions: {
            title: "Magnitude"
          },
          stops: [
          {
            value: 2.9,
            size: 4,
            label: "<2.9"
          },
          {
            value: 3.4,
            size: 8,
            label: "2.9 - 3.4"
          },
          {
            value: 3.9,
            size: 12,
            label: "3.5 - 3.9"
          },
          {
            value: 4.9,
            size: 18,
            label: "4.0 - 4.9"
          },
          {
            value: 5.9,
            size: 26,
            label: "5.0 - 5.9"
          },
          {
            value: 6.9,
            size: 36,
            label: "6.0 - 6.9"
          }]
        }]
      };


      var rendererFloodCanyon = {
        type: "unique-value", // autocasts as new UniqueValueRenderer()
        field: "FCHHazardLine",
        //defaultSymbol: { type: "simple-line" },
        uniqueValueInfos: [
        {
    // All features with value of "Very High" will be green
    value: "VHfch",
    label: "Very High",
    symbol: {
      type: "simple-line",  // autocasts as new SimpleFillSymbol()
      color: "red",
      width: "2px"
    }
  },{

              // All features with value of "High" will be blue
    value: "Hfch",
    label: "High",
    symbol: {
      type: "simple-line",  // autocasts as new SimpleFillSymbol()
      color: "blue",
      width: "2px"
    }
  }]
      };

      //quad renderer
      var quadRenderer = {
          type: "simple",
          symbol: {
              type: "simple-fill",
              color: [0, 0, 0, 0],
              outline: {
                  width: 1,
                  color: "#db0202",
              }

          }
      }

      //label quad boundaries
// const quadsLabelClass = new LabelClass({
//   labelExpressionInfo: { expression: "$feature.NAME" },
//   symbol: {
//     type: "text",  // autocasts as new TextSymbol()
//     color: "red",
//     //haloSize: 1,
//     //haloColor: "white"
//   }
// });




            const landslideComp = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/4",
                title: "Legacy Landslide Compilation",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                    title: "<b>Legacy Landslide Compilation</b>",
                    outFields: ["*"],
                    content: landslideCompPopup,
                },
                minScale: 300000,
            });

            const landslideDeposit = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/3",
                title: "Landslides",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                    title: "<b>Landslides</b>",
                    outFields: ["*"],
                    content: landslideSourcePopup,
                }
            });



            const landslideSusceptibility = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/2",
                visible: false,
                //renderer: landslideSusRenderer,
                title: "Landslide Susceptibility",
                outFields: ["*"],
                // popupTemplate: {
                //     outFields: ["*"],
                //     title: "<b>{relationships/3/HazardName}</b>",
                //     content: lssPopup,
                // }
                popupTemplate: {
                     title: "<b>Landslide Susceptibility</b>",
                     outFields: ["*"],
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                            fieldName: "relationships/3/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "Hazard_Symbology_Text",
                         visible: false,
                         label: "Hazard"
                        }, {
                            fieldName: "LSSCriticalAngle",
                            visible: false,
                            label: "Critical Angle"
                        }
                    ]
                     },
                     {
                    type: "text",
                    //text: "<b>Description: </b>{relationships/3/Description}<br>{LSSMappedScale:lssPopup}<br>{LSSCriticalAngle:lssPopup}"
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/3/Description}<b>Mapped Scale: </b>{LSSMappedScale}<br><b>Critical Angle: </b>{LSSCriticalAngle}"
                }]
                     }
            });            

            const epicentersRecent = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Earthquake_Hazards/FeatureServer/0",
                title: "Epicenters (1850 to 2016)",
                // elevationInfo: [{
                //     mode: "on-the-ground"
                // }],
                visible: false,
                outFields: ["*"],
            popupTemplate: {
                    title: "<b>Earthquake Epicenter Information</b>",
                    outFields: ["*"],
                    content: epicentersPopup,

            },
                renderer: rendererRecent,
            });


            const epicentersMining = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Earthquake_Hazards/FeatureServer/1",
                title: "Mining-Induced Epicenters",
                //elevationInfo: [{
                //     mode: "on-the-ground"
                // }],
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                    title:"Mining-Induced Epicenters",
                    outFields: ["*"],
                    content: miningepicentersPopup,
                    //content: "{Mag:miningepicentersPopup}{Depth:miningepicentersPopup}{Long:miningepicentersPopup}{Lat:miningepicentersPopup}{Date:miningepicentersPopup}"
                },
                renderer: rendererMining,
            });

            const liquefaction = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Earthquake_Hazards/FeatureServer/3",
                title: "Liquefaction Susceptibility",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>Liquefaction Susceptibility</b>",
                     outFields: ["*"],

                     content: [{
                         type: "fields",
                         fieldInfos: [
                             {
                             fieldName: "Hazard_Symbology_Text",
                             visible: false,
                             label: "Hazard"
                         },
                         {
                            fieldName: "relationships/0/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "MappedScale",
                         visible: false,
                         label: "Mapped Scale"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/0/Description}<br><b>Mapped Scale: </b>{LQSMappedScale}"
                }]
                     }
                    // content: "{LQSHazardUnit:liquefactionPopup}{LQSMappedScale:liquefactionPopup}"
                
            });


            const qFaults = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Earthquake_Hazards/FeatureServer/2",
                title: "Quaternary Faults",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                    title:"<b>Quaternary Faults</b>",
                    content: qfaultsPopup
                },
                

            });

            const faultRupture = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Earthquake_Hazards/FeatureServer/4",
                title: "Surface Fault Rupture Hazard Special Study Zone",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/1/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "SFRMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/1/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/1/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "{relationships/1/Description}<br><b>Mapped Scale: </b>{SFRMappedScale}"
                }]
                     }
            });

            const eolianSus = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/19",
                title: "Wind-Blown Sand Susceptibility",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>Wind-Blown Sand Susceptibility</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [
                             {
                             fieldName: "Hazard_Symbology_Text",
                             visible: false,
                             label: "Hazard"
                         },
                         {
                            fieldName: "relationships/17/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, 
                        // {
                        //  fieldName: "relationships/17/HazardName",
                        //  visible: false,
                        //  label: "Hazard"
                        // }
                    ]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/16/Description}<br><b>Mapped Scale: </b>{WSSMappedScale}"
                }]
                     }          
            });

            const tectonicDef = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/16",
                title: "Salt Tectonics Related Ground Deformation",
                visible: false,     
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/14/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [
                         {
                             fieldName: "Hazard_Symbology_Text",
                             visible: false,
                             label: "Hazard"
                         },
                             {
                             fieldName: "SDHMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/14/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/14/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/13/Description}<br><b>Mapped Scale: </b>{SDHMappedScale}"
                }]
                     }                     
            });

            const bedrockPot = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/17",
                title: "Shallow Bedrock Potential",
                visible: false,   
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/15/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [
                         {
                             fieldName: "Hazard_Symbology_Text",
                             visible: false,
                             label: "Hazard"
                         },
                             {
                             fieldName: "SBPMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/15/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/15/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/14/Description}<br><b>Mapped Scale: </b>{SBPMappedScale}"
                }]
                     }                       
            });

            const rockfallHaz = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/15",
                title: "Rockfall Hazard",
                visible: false,    
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/13/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [
                             
                         {
                             fieldName: "Hazard_Symbology_Text",
                             visible: false,
                             label: "Hazard"
                         },
                             {
                             fieldName: "RFHMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/13/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/13/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/12/Description}<br><b>Mapped Scale: </b>{RFHMappedScale}"
                }]
                     }                      
            });

            const pipingSus = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/13",
                title: "Piping and Erosion Suscepbtibility",
                visible: false,  
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/11/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "PESMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/11/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/11/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/10/Description}<br><b>Mapped Scale: </b>{PESMappedScale}"
                }]
                     }                        
            });

            const expansiveSoil = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/10",
                title: "Expansive Soil and Rock Susceptibility",
                visible: false,  
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/9/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "EXSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/9/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/9/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/8/Description}<br><b>Mapped Scale: </b>{EXSMappedScale}"
                }]
                     }                        
            });

            const groundwaterSus = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/1",
                title: "Shallow Groundwater Susceptibility",
                visible: false,
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/2/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "FLHMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/2/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/2/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/1/Description}<br><b>Mapped Scale: </b>{SGSMappedScale}"
                }]
                     }                
            });

            const radonSus = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/14",
                title: "Radon Susceptibility",
                visible: false,         
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/12/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "GRSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/12/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/12/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/11/Description}<br><b>Mapped Scale: </b>{GRSMappedScale}"
                }]
                     }                 
            });

            const corrosiveSoil = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/7",
                title: "Corrosive Soil and Rock Susceptibility",
                visible: false,  
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/6/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "CRSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/6/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/6/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/5/Description}<br><b>Mapped Scale: </b>{CRSMappedScale}"
                }]
                     }                        
            });

            const collapsibleSoil = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/6",
                title: "Collapsible Soil Susceptibility",
                visible: false, 
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/5/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "CSSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/5/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/5/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/4/Description}<br><b>Mapped Scale: </b>{CSSMappedScale}"
                }]
                     }              
            });

            const solubleSoil = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/18",
                title: "Soluble Soil and Rock Susceptibility",
                visible: false,   
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/16/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "SLSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/16/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/16/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/15/Description}<br><b>Mapped Scale: </b>{SLSMappedScale}"
                }]
                     }                       
            });

            const caliche = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/5",
                title: "Caliche Susceptibility",
                visible: false,  
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/4/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "CASMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/4/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/4/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "{relationships/3/Description}<br><b>Mapped Scale: </b>{CASMappedScale}"
                }]
                     }              
            });

            // const floodCanyon = new FeatureLayer({
            //     url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/0",
            //     title: "Flood Canyon Hazard",
            //     renderer: rendererFloodCanyon,
            //     visible: false,  
            //     outFields: ["*"],
            //     popupTemplate: {
            //          title: "<b>{relationships/0/HazardName}</b>",
            //          content: [{
            //              type: "fields",
            //              fieldInfos: [{
            //                  fieldName: "FCHMappedScale",
            //                  visible: false,
            //                  label: "Mapped Scale"
            //              },
            //              {
            //                 fieldName: "relationships/0/Description",
            //                 visible: false,
            //                 label: "Hazard Description"
            //             }, {
            //              fieldName: "relationships/0/HazardName",
            //              visible: false,
            //              label: "Hazard"
            //             }]
            //          },
            //          {
            //         type: "text",
            //         text: "<b>{Hazard_Symbology_Text}: </b>{relationships/0/Description}<br>{FCHMappedScale:fchPopup}"
            //     }]
            //          }              
            // });

            const floodHazard = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/0",
                title: "Flood Hazard",
                visible: false, 
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/1/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "FLHMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/1/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/1/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/0/Description}<br><b>Mapped Scale: </b>{FLHMappedScale}"
                }]
                     }                 
            });

            const earthFissure = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/8",
                title: "Earth Fissure Hazard",
                visible: false,   
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/7/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "EFHMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/7/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/7/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/6/Description}<br><b>Mapped Scale: </b>{EFHMappedScale}"
                }]
                     }                       
            });

            const erosionZone = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/9",
                title: "JE Fuller Flood Erosion Hazard Zones",
                visible: false,   
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/8/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "ERZMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/8/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/8/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "{relationships/7/Description}<br><b>Mapped Scale: </b>{ERZMappedScale}"
                }]
                     }                       
            });

            const groundSubsidence = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/11",
                title: "Ground Subsidence Potential",
                visible: false,        
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/5/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "CSSMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/5/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/5/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "{relationships/4/Description}<br><b>Mapped Scale: </b>{CSSMappedScale}"
                }]
                     }                  
            });

            const karstFeatures = new FeatureLayer({
                url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards/FeatureServer/12",
                title: "Karst Features",
                visible: false,  
                outFields: ["*"],
                popupTemplate: {
                     title: "<b>{relationships/10/HazardName}</b>",
                     content: [{
                         type: "fields",
                         fieldInfos: [{
                             fieldName: "GSPMappedScale",
                             visible: false,
                             label: "Mapped Scale"
                         },
                         {
                            fieldName: "relationships/10/Description",
                            visible: false,
                            label: "Hazard Description"
                        }, {
                         fieldName: "relationships/10/HazardName",
                         visible: false,
                         label: "Hazard"
                        }]
                     },
                     {
                    type: "text",
                    text: "<b>{Hazard_Symbology_Text}: </b>{relationships/9/Description}<br><b>Mapped Scale: </b>{GSPMappedScale}"
                }]
                     }                        
            });

            const soilHazards = new GroupLayer({
                title: "Problem Soil and Rock Hazards",
                visible: true,
                layers: [radonSus, eolianSus, pipingSus, rockfallHaz, bedrockPot, solubleSoil, tectonicDef, karstFeatures, groundSubsidence, expansiveSoil, erosionZone, earthFissure, corrosiveSoil, collapsibleSoil, caliche]
            });

            const quadBoundaries = new FeatureLayer({
              url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer/0",
              title: "USGS 1:24,000 Scale Quad Boundaries",
              labelingInfo: {
  labelExpressionInfo: { expression: "$feature.NAME" },
  symbol: {
    type: "text",  // autocasts as new TextSymbol()
    color: "#db0202",
    font: { // autocast as new Font()
            family: "serif",
            size: 10,
            weight: "bold",
            style: "italic"
          }
    //haloSize: 1,
    //haloColor: "white"
  }
},
              renderer: quadRenderer,
              visible: false,
            })

            const hazardStudy = new FeatureLayer({
              url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer/1",
              title: "Mapped Areas",
              outFields: ["*"],
              popupTemplate: {
                outFields: ["*"],
                title: "<b>Mapped Areas</b>",
                content: studyAreasPopup,
              }
            
              //visible: true,
            });

            const lidarBounds = new FeatureLayer({
              url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer/2",
              title: "Lidar Extents",
              visible: false,
            })

            const airphotoPoints = new FeatureLayer({
              url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer/3",
              title: "Aerial Imagery Centerpoints",
              visible: false,
              minScale: 500000,
            })

            const notMapped = new FeatureLayer({
              url: "https://services.arcgis.com/ZzrwjTRez6FJiOq4/arcgis/rest/services/Utah_Geologic_Hazards_Supplemental_Data_View/FeatureServer/4",
              title: "Areas Not Mapped w/in Project Areas",
              visible: true,
            })

            //grouplayers for organization

            const floodHazards = new GroupLayer({
                title: "Flooding Hazards",
                visible: true,
                layers: [floodHazard, groundwaterSus]
            });

            const earthquakes = new GroupLayer({
                title: "Earthquake Hazards",
                visible: true,
                layers: [liquefaction, qFaults, faultRupture, epicentersMining, epicentersRecent]
            });

            const landslides = new GroupLayer({
                title: "Landslide Hazards",
                visible: true,
                layers: [landslideComp, landslideSusceptibility, landslideDeposit],    
            });
            
            mapView.map.add(quadBoundaries);
            mapView.map.add(airphotoPoints);
            mapView.map.add(lidarBounds);
            mapView.map.add(notMapped);
            mapView.map.add(hazardStudy);
            mapView.map.add(soilHazards);
            mapView.map.add(landslides);
            mapView.map.add(floodHazards);
            mapView.map.add(earthquakes);
            mapView.map.add(tempGraphicsLayer);




layerList = new LayerList({
    view: mapView,
    container: "legendDiv",
    listItemCreatedFunction: function(event) {
        const item = event.item;
        //console.log(item);
        if (item.layer.type != "group") { // don't show legend twice
            item.panel = {
                content: "legend",
                open: true
            }
            item.actionsSections = [
                // [{
                //     title: "Layer information",
                //     className: "esri-icon-description",
                //     id: "information"
                // }],
                [{
                    title: "Increase opacity",
                    className: "esri-icon-up",
                    id: "increase-opacity"
                }, {
                    title: "Decrease opacity",
                    className: "esri-icon-down",
                    id: "decrease-opacity"
                }]
            ];
        }
    }
});


//layerlist action for opacity

layerList.on("trigger-action", function(event) {

console.log(event);



// Capture the action id.
var id = event.action.id;

var title = event.item.title;

if (title === "Hazard Study Area Boundaries") {
                    layer = hazardStudy;
                } else if (title === "Epicenters (1850 to 2016)") {
                    layer = epicentersRecent;
                } else if (title === "Epicenters 1850 to June 1962") {
                    layer = epicentersHistoric;
                } else if (title === "Mining-Induced Epicenters") {
                    layer = epicentersMining;
                } else if (title === "Aerial Imagery Centerpoints") {
                    layer = airphotoPoints;
                } else if (title === "Lidar Extents") {
                    layer = lidarBounds;
                } else if (title === "USGS 1:24,0000 Scale Quad Boundaries") {
                    layer = quadBoundaries;
                } else if (title === "Karst Features") {
                    layer = karstFeatures;
                } else if (title === "Ground Subsidence Potential") {
                    layer = groundSubsidence;
                } else if (title === "Erosion Hazard Zone") {
                    layer = erosionZone;
                } else if (title === "Earth Fissure Hazard") {
                    layer = earthFissure;
                } else if (title === "Flood Hazard") {
                    layer = floodHazard;
                } else if (title === "Flood Canyon Hazard") {
                    layer = floodCanyon;
                } else if (title === "Caliche Susceptibility") {
                    layer = caliche;
                } else if (title === "Soluble Soil & Rock Susceptibility") {
                    layer = solubleSoil;
                } else if (title === "Collapsible Soil Susceptibility") {
                    layer = collapsibleSoil;
                } else if (title === "Corrosive Soil and Rock Susceptibility") {
                    layer = corrosiveSoil;
                } else if (title === "Radon Susceptibility") {
                    layer = radonSus;
                } else if (title === "Shallow Groundwater Susceptibility") {
                    layer = groundwaterSus;
                } else if (title === "Expansive Soil and Rock Susceptibility") {
                    layer = expansiveSoil;
                } else if (title === "Piping and Erosion Suscepbtibility") {
                    layer = pipingSus;
                } else if (title === "Rockfall Hazard") {
                    layer = rockfallHaz;
                } else if (title === "Shallow Bedrock Potential") {
                    layer = bedrockPot;
                } else if (title === "Salt Tectonics Related Ground Deformation") {
                    layer = tectonicDef;
                } else if (title === "Wind-Blown Sand Susceptibility") {
                    layer = eolianSus;
                } else if (title === "Surface Fault Rupture Hazard Special Study Zone") {
                    layer = faultRupture;
                } else if (title === "Quaternary Faults") {
                    layer = qFaults;
                } else if (title === "Landslide Susceptibility") {
                    layer = landslideSusceptibility;
                }  else if (title === "Landslides") {
                    layer = landslideDeposit;
                } else if (title === "Legacy Landslide Compilation") {
                    layer = landslideComp;
                } else if (title === "Dam Failure") {
                    layer = damInun;
                } else if (title === "Floodplains") {
                    layer = fema;
                }

if (id === "information") {

  // if the information action is triggered, then
  // open the item details page of the service layer
  window.open(layer.url);

} else                 if (id === "increase-opacity") {
                    // if the increase-opacity action is triggered, then
                    // increase the opacity of the GroupLayer by 0.25

                    if (layer.opacity < 1) {
                        layer.opacity += 0.1;
                    }
                } else if (id === "decrease-opacity") {
                    // if the decrease-opacity action is triggered, then
                    // decrease the opacity of the GroupLayer by 0.25

                    if (layer.opacity > 0) {
                        layer.opacity -= 0.1;
                    }
                }
});




            // geolocate user position
            query(".dropdown-menu").on("click", function(e) {
                if (e.target.text == " Locate") {
                    locate.locate().then(function() {
                        // do we want to add a note to user?
                        if (query(".calcite-dropdown.open")[0]) {
                            query(".calcite-dropdown, .calcite-dropdown-toggle").removeClass("open");
                        } // end if
                    }) // end .then
                } // end if
            }); // end query


            // Basemap events
            query("#selectBasemapPanel").on("change", function(e) {
                if (e.target.value == "ustopo") {
                    // setup the ustopo basemap global variable.
                    var ustopo = new Basemap({
                        baseLayers: new TileLayer({
                            url: "https://server.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer"
                        }),
                        title: "usTopographic",
                        id: "ustopo"
                    });
                    mapView.map.basemap = ustopo;
                    // if mapview use basemaps defined in the value-vector=, but if mapview use value=
                } else if (map.mview == "map") {
                    mapView.map.basemap = e.target.options[e.target.selectedIndex].dataset.vector;
                } else { // =="scene"
                    mapView.map.basemap = e.target.value;
                }
            });

 //SketchView functions
 mapView.when(function() {
                    // create a new sketch view model
                    const sketchViewModel = new SketchViewModel({
                    view: mapView,
                    layer: tempGraphicsLayer,
                     polygonSymbol: {
                      type: "simple-fill", // autocasts as new SimpleFillSymbol()
                      color: "rgba(138,43,226, 0.8)",
                      style: "solid",
                       outline: {
                         color: "white",
                       width: 1
                      }
                     }
                 });

                         setUpClickHandler();

//Listen to create event to add a newly created graphic to view
sketchViewModel.on(["create"], addGraphic);

//Listen the sketchViewModel's update
sketchViewModel.on(["update"], updateGraphic);



//Called when sketchViewModel's create-complete event is fired
function addGraphic(event) {
  // Create a new graphic and set its geometry to
  // `create-complete` event geometry.
  graphic = new Graphic({
    geometry: event.geometry,
    symbol: sketchViewModel.polygonSymbol
  });
  tempGraphicsLayer.add(graphic);
  console.log(event.graphic);
  aoi = event.graphic.geometry.toJSON();
}


//Called when sketchViewModel's update-complete or update-cancel
function updateGraphic(event) {
  // event.graphic is the graphic that user clicked on and its geometry
  // has not been changed. Update its geometry and add it to the layer
  event.graphic.geometry = event.geometry;
  tempGraphicsLayer.add(event.graphic);

  // set the editGraphic to null update is complete or cancelled.
  editGraphic = null;
}


//Logic to handle geometry update and reflect the update on "tempGraphicsLayer"

function setUpClickHandler() {
  mapView.on("click", function(event) {
    mapView.hitTest(event).then(function(response) {
      var results = response.results;
      // Found a valid graphic
      if (results.length && results[results.length - 1]
        .graphic) {
        // Check if we're already editing a graphic
        if (!editGraphic) {
          // Save a reference to the graphic we intend to update
          editGraphic = results[results.length - 1].graphic;
          // Remove the graphic from the GraphicsLayer
          // Sketch will handle displaying the graphic while being updated
          tempGraphicsLayer.remove(editGraphic);
          sketchViewModel.update(editGraphic);
        }
      }
    });
  });
}



//Polygon draw button
var drawPolygonButton = document.getElementById("polygonButton");
drawPolygonButton.onclick = function() {
  // set the sketch to create a polygon geometry
  sketchViewModel.create("polygon");
  setActiveButton(this);
};

//Download button 
var downloadButton = document.getElementById("DownloadButton");
downloadButton.onclick = function() {
  // set the sketch to create a polygon geometry
  //sketchViewModel.create("polygon");
//   var inputGraphicContainer = [];
//           inputGraphicContainer.push(graphic);
//           var featureSet = new FeatureSet();
//           featureSet.features = inputGraphicContainer;
//           console.log(inputGraphicContainer);
//           console.log(featureSet);
  console.log(graphic);
  console.log(aoi);

  var params = {
        description: "Test",
        polygon: aoi,

          };
    console.log(params);

    localStorage.setItem('aoi', JSON.stringify(params));
    console.log(localStorage);
    window.open('./report');
};


//Reset button
document.getElementById("resetBtn").onclick = function() {
  sketchViewModel.cancel();
  tempGraphicsLayer.removeAll();
  setActiveButton();
};

function setActiveButton(selectedButton) {
  // focus the view to activate keyboard shortcuts for sketching
  mapView.focus();
  var elements = document.getElementsByClassName("active");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove("active");
  }
  if (selectedButton) {
    selectedButton.classList.add("active");
  }
}
});




    });
