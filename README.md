# BISWAL_Assignment
# HTML
- Modern Elements System
    - HTML 5 = HTML tags + Inline JavaScript + Inline CSS
- UI Requirements
    - Layout, e.g. table, div
        - use 'article' for self-contaiuned contents 
            - Offer the default layout to render the contents
            - They have own settings for to distribute contents contained inside it
            - Use for
                - News
                - Blogs
                - Forums   
        - use 'paragraph' to auto arrange contents
        - Use the Look and feel features properly so that End-User can feel comfortable while interacting
            - CSS
                - JS Object model used to present the HTML Elements System in interactive fashion based on following measures
                    - Alignment
                        - W.r.t. the perent the position of Element
                    - Back Color
                    - Fore Color
                    - Dimensions
                        - Height, Width, Angle, etc.
                    - Margins
                        - W.r.t. the parent the top-left of the element
                - CSS Object Model has the followig systax
                    - .[CLASS-NAME] {
                        [STYLE-NAME]:[VALUE-FOR-STYLE]
                    }        
                    - The '.' is the style class prefix
                    - The 'CLASS-NAME', the CSS style group name which will be applied on HTML Element to changen is look and feel
                    - The 'STYLE-NAME', the actual property that will be set on HTML elementy for its look and feel
                        - e.g. margin, height, width, etc
                    - The 'VALUE-FOR-STYLE' the value that will be assigned to HTML element
                - Styles + JavaScript
                    - RICH UI and Dynamic User Experience (UX)        
        - Each HTML element has an 'Attribute-System'
            - A Mechanism to handle the look and feel and behavior of HTML Element
            - Property-Attributes
                - USed to Read/Write values 
                    - e.g. value, changed, etc.
                - USed to apply styles
                    - The 'class'
                    - The 'style', to defie inline CSS to HTMl Element (Possibly Avoid this)
                - Used to Access HTML Element using JavaScript           
                    - The 'id', 'name'
            - Event Attributes
                - USed to define a behavior of HTML elements based on Event
                    - click, change, blur, mousemove, etc.            
# CSS Practices
1. Use Selectors Wisely
    - Selectors
        - JSOM mechasim to extract HTML element from DOM to apply the Style on it     
        - How to extract HTML element from DOM? 
            - The 'id'
                - A single HTML Element will be extracted
            - The 'class'  
                - A group of HTML elements, HtmlElementCollection object (an Array of HTML Element)    
            - The 'tag'
                - The HTML element based on tag e.g. input, div, table, etc.
                - A group of HTML elements of specific tag
        - Combinational Selectors, introduced in CSS 3  
            - tag[type] selector
                -  matching tag but with specific type
                - e.g.
````html                
    <input type="button" value="click"/>
````                    
````css
     input[type="button"]{}
````
            - tag[.class] selector
                - match tag but with specific class attribute value         
````html                
    <input type="button" value="click" class="b2"/>
````                    
````css
     input.b2{}
````                      
# CSS 3 Query-Based Selectors
- Used to apply CSS Styles on elements based in DOM Iteration
    - Combinational Selectors based on Position of the element
- Pseudo-Classes
    - Based on the State of the element
    - State is defined based on action performed by end-user on DOM Element  
    - The CSS 3 listen to DOM events and directly applies styles on HTML Elements
 - Pseudo-Elements 
    - based on specific index of the element
    - The Value aka Contents inside the element      
    - E.g.
        - Applying Styles on a first element in collection or first character or first line
        - Inserionof contents at some position
    - syntax
        - The '::' syntax for Pseudo-Elements 
        - selector::Pseudo-Elements {
            css style property: value
        }    
# CSS 3 Layout Enhancemnets
- Box Model
    - The Container Elements
        - Content
            - Contents (Text / Element) presnet in Layout element e.g. div
        - Padding
            - The arrangement for contmets from inside the Layout
        - Border
            - Border of the Layout
        - Margin
            - From outside w.r.t. parent of the layout
- Flexbox
    - A layout for an easy orgainizing the Display Elements based on the flexible responsive layput chamges of the browser
    - Eleminates need of float and positioning 
    - Class properties for Contents
        -  flex-grow: Percentage of expanding the content aka grow
- Grid      
    - A Comoputed layout that is used to well organize the UI based on the dimensions of the Browser where the page is rendered
        - The 12 Column Grid Layout at max is supported by all browser
        - Defulat with for each column is 100px (Note: based on Display settings )
    - Native to CSS 3
        - Supported by Most popular browsers
    - Grid Container
        - applied on Layout Element e.g. div
    - Grid Item
        - applied on contents of the Layout element 

# Date: 06-July-2023
# Using Bootstrap
- refer it in the project by downloading it using Node Package Manager (NPM)
    - Required Node.js downloaded n=and installed on the machine
        - https://www.nodejs.org
    - We need 'package.json' that contains  list of app packages used by the current application
        - npm init -y
            - Create package.json with default settings
        - npm install --save [PACKAGE-NAME]
            - npm install --save bootstrap
- Standard CSS for
    - Layout
        - div
            - container class
                - default marging from top-left-right-bottom
            - grid class
                - Mobilem first flexbox grid
                - 12 Columns System
                - six responsive tiers
                - The 'row' Class applied to div for row definition
                - The 'col' class applied to div for column
                    - col < 567px
                    - sm > 567px
                    - md >= 768px
                    - lg 990+
                    - xl 1200
                    - xxl 1400
        - table
            - table class
                - table-bordered table-striped table-condensed table-dark table-danger, etc 
    - Forms
        - form-group, applied on div
        - form-control, applied on editable elements e.g. input:text, input:rafio, select, etc.
    - Buttons
        - btn , btn-success, btn-primary, btn-warning, btn-danger, etc. 
            - icons for buttons
    - Note:
        - To use CSS in application for enhancing HTML elements we need to refer the bootstrap CSS Library
    - CSS Class Prefixes
        - sm, small
        - lg, large
        - col, columm
        - row, row    
    - Responsive UI as well as RICH UI
        - Forms
            - RICH and Response Forms
            - Classes for FOrm Elements
                - form-control
                    - -lg
                    - -sm
                    - form-text
                    - diabled  
        - Navigations
            - Navigation classes
                - navbar (verticle Navigation)
                    - navbar-expand-sm, lg (horizontal)
                    - applied on 'nav' tag
                - navbar-nav
                    - class for rendering the Navigation UI
                    - applied on 'ul' tag     
                - nav-item
                    - applied on 'li' tag list item
                - nav-link    
                    - anchor tag
        - Dropdown class
            - This is a class-plugin
                - This needs the Bootstrap JavaScript to be loaded on browser to activate the plugin
            - The 'dropdown' class
                - Used to create a scope for 'ul' to exand and collaspe the list based on 'toggeling'
                    - dropdown-toggle
                        - applied on the element that shows an UX for dropdown e.g. button
                - dropdown-menu
                    - dropdown-item            

- Components
    - Plugins, HTML + CSS + JavaScript   
        - Bootstrap Framework      
    - To use these plugins we need to load
        - CSS files
        - JS files     
    - Model-Dialog
    - AutoComplete
    - Progressbar and slider
    - Carousel
    - Pagination
    - Dropdown
    - Breadcumb
    - Accordian
    - .... and many more      
