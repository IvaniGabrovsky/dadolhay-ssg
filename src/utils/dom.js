/**
 * This file contains the tools for generating and
 * serializing the DOM object
 */

const { DOMImplementation, XMLSerializer } = require('xmldom');

const createDom = () => {
  const DOMImplementationInstance = new DOMImplementation();
  // This will dictate the docType. For html5 we only need <!DOCTYPE html>
  const docType = DOMImplementationInstance.createDocumentType('html');
  const dom = DOMImplementationInstance.createDocument(
    null, // With html5, xmlns is implicite
    'html', // The root node type
    docType
  );

  return dom;
};

const serializeDom = dom => new XMLSerializer().serializeToString(dom);

module.exports = { createDom, serializeDom };
