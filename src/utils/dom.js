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

const createDocument = config => {
  const DOMImplementationInstance = new DOMImplementation();
  const document = DOMImplementationInstance.createDocument(
    null, // With html5, xmlns is implicite
    'html', // The root node type
    // This will dictate the docType. For html5 we only need <!DOCTYPE html>
    DOMImplementationInstance.createDocumentType('html')
  );

  addBaseStructure(document, config);

  return document;
};

const serializeDom = dom => new XMLSerializer().serializeToString(dom);

module.exports = { createDocument, serializeDom };
