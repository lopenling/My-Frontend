<template>
    <svg
      v-if="extractedContent && extractedAttributes"
      v-bind="extractedAttributes"
      v-html="extractedContent"
    ></svg>
  </template>
  
  <script>
  export default {
    // Defines a prop 'svg', which accepts a string.
    // This string is expected to be an SVG markup from which the component will extract content and attributes.
    props: {
      svg: {
        type: String,
        required: true,
      },
    },
    computed: {
      // A computed property that extracts the inner content of the SVG markup.
      // It uses a regular expression to match anything between the opening and closing SVG tags.
      // If there's a match, it returns the first captured group (the SVG content). If not, it returns an empty string.
      extractedContent() {
        if (this.svg) {
          const contentPattern = /<svg[^>]*>([\s\S]*?)<\/svg>/i;
          const contentMatch = this.svg.match(contentPattern);
          return contentMatch ? contentMatch[1] : "";
        } else {
          return "";
        }
      },
      // A computed property that extracts the attributes from the SVG markup.
      // It uses a regular expression to match anything within the opening SVG tag.
      // If there's a match, it parses the attributes string into an object using the 'parseAttributes' method.
      // If not, it returns an empty object.
      extractedAttributes() {
        const attributesPattern = /<svg\s*([^>]*)>/i;
        const attributesMatch = this.svg.match(attributesPattern);
        return attributesMatch ? this.parseAttributes(attributesMatch[1]) : {};
      },
    },
    methods: {
      // A method that parses a string of SVG attributes into an object.
      // It uses a regular expression to match attribute-value pairs and iteratively adds them to an object.
      parseAttributes(attributesString) {
        let attributes = {};
        let attributePattern = /(\w[-\w]*\w)=["']([^"']*)["']/g;
        let attributeMatch;
        while (
          (attributeMatch = attributePattern.exec(attributesString)) !== null
        ) {
          let [fullMatch, name, value] = attributeMatch;
          attributes[name] = value;
        }
        return attributes;
      },
    },
  };
  </script>
  