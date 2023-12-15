type ContentNodeText = {
  nodeType:
    | "hr"
    | "paragraph"
    | "heading-2"
    | "heading-3"
    | "heading-4"
    | "heading-5"
    | "heading-6";
  data: {};
  content: Array<{
    nodeType: "text";
    value: string;
    marks: Array<
      | { type: "superscript" }
      | { type: "subscript" }
      | { type: "code" }
      | { type: "italic" }
      | { type: "bold" }
      | { type: "underline" }
    >;
    data: {};
  }>;
};

type ContentNodeImage = {
  nodeType: "embedded-asset-block";
  data: {
    target: {
      metadata: {
        tags: [];
      };
      sys: {
        space: {
          sys: {
            type: "Link";
            linkType: "Space";
            id: string;
          };
        };
        id: string;
        type: "Asset";
        createdAt: string;
        updatedAt: string;
        environment: {
          sys: {
            id: string;
            type: "Link";
            linkType: "Environment";
          };
        };
        revision: number;
        locale: string;
      };
      fields: {
        title: string;
        description: string;
        file: {
          url: string;
          details: {
            size: number;
            image: {
              width: number;
              height: number;
            };
          };
          fileName: string;
          contentType: string;
        };
      };
    };
  };
  content: [];
};

type ContentNodeTable = {
  nodeType: "table";
  data: {};
  content: Array<{
    nodeType: "table-row";
    data: {};
    content: Array<{
      nodeType: "table-cell";
      data: {};
      content: Array<{
        nodeType: "paragraph";
        data: {};
        content: Array<{
          nodeType: string;
          value: string;
          marks: [];
          data: {};
        }>;
      }>;
    }>;
  }>;
};

type ContentNodeHyperlink = {
  nodeType: "hyperlink";
  data: {
    uri: string;
  };
  content: Array<{
    nodeType: "text";
    value: string;
    marks: Array<
      | { type: "superscript" }
      | { type: "subscript" }
      | { type: "code" }
      | { type: "italic" }
      | { type: "bold" }
    >;
    data: {};
  }>;
};

type ContentNodeBlockquote = {
  nodeType: "blockquote";
  data: {};
  content: Array<ContentNodeText>; // Assuming blockquote contains paragraphs
};

type ContentNodes = {
  fields: {
    mainContent: (
      | ContentNodeText
      | ContentNodeImage
      | ContentNodeTable
      | ContentNodeHyperlink
      | ContentNodeBlockquote
    )[];
  };
};
