/**
 * This file contains the tools for generating and
 * serializing the DOM object
 */

const { DOMImplementation, XMLSerializer } = require('xmldom');

const addBaseStructure = (document, { title }) => {
  const html = document.getElementsByTagName('html').item(0);
  html.setAttribute('lang', 'en');

  const head = document.createElement('head');
  html.appendChild(head);

  const body = document.createElement('body');
  html.appendChild(body);

  const meta1 = document.createElement('meta');
  meta1.setAttribute('charset', 'utf-8');
  head.appendChild(meta1);

  const meta2 = document.createElement('meta');
  meta2.setAttribute('name', 'viewport');
  meta2.setAttribute('content', 'width=device-width');
  meta2.setAttribute('initial-scale', 1);
  head.appendChild(meta2);

  if (title) {
    const titleEl = document.createElement('title');
    titleEl.textContent = title;
    head.appendChild(titleEl);
  }
};

const addBodyContent = (document, { blocks }) => {
  const body = document.getElementsByTagName('body').item(0);

  // Loop through all the blocks and add them into the XML document
  blocks.forEach(({ type, content }) => {
    //Issue 6: Adding a condition for the type that will be passed on the dom
    let typeVal;
    if (type === 'title') typeVal = 'h1';
    else if (type === 'h1') typeVal = 'h1';
    else if (type === 'h2') typeVal = 'h2';
    else typeVal = 'p';

    const containerEl = document.createElement(typeVal);
    body.appendChild(containerEl);

    // Add each line one by one
    content.forEach((line, index) => {
      if (index) {
        const brEl = document.createElement('br');
        containerEl.appendChild(brEl);
      }

      const textNode = document.createTextNode(line);
      containerEl.appendChild(textNode);
    });
    // el.textContent = content;
  });
};

const createDocument = config => {
  const DOMImplementationInstance = new DOMImplementation();
  const document = DOMImplementationInstance.createDocument(
    null, // With html5, xmlns is implicite
    'html', // The root node type
    // This will dictate the docType. For html5 we only need <!DOCTYPE html>
    DOMImplementationInstance.createDocumentType('html')
  );

  addBaseStructure(document, config);
  addBodyContent(document, config);

  return document;
};

const serializeDom = dom => new XMLSerializer().serializeToString(dom);

module.exports = { createDocument, serializeDom };
