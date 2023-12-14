import { createClient } from "contentful";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Image from "next/image";
import Head from "next/head";

import { Navbar, Headline } from "@/components/projectsPage";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

// Generate all paths for all blogPosts
export const getStaticPaths = async ({ locales }: any) => {
  const res = await client.getEntries({
    content_type: "blogPost",
  });

  const paths: any = [];

  res.items.map((item) => {
    locales.forEach((locale: any) => {
      paths.push({
        params: { slug: item.fields.slug },
        locale: locale,
      });
    });
  });

  return {
    paths: paths,
    fallback: false,
  };
};

// Injecting props into the page
export async function getStaticProps({ params, locale }: any) {
  if (locale === "es") locale = "en";

  const { items } = await client.getEntries({
    content_type: "blogPost",
    "fields.slug": params.slug,
    locale,
  });

  return {
    props: {
      blogPost: items[0],
      ...(await serverSideTranslations(locale, ["projectsCommon"])),
    },
  };
}

export default function ArticlePage({ blogPost }: any) {
  const commonTextStyles: any = {
    mt: "14px",
    align: "justify",
  };

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: ContentNodeImage) => {
        const { url, details, fileName } = node.data.target.fields.file;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "40px",
              width: "100%",
              marginTop: "40px",
            }}
          >
            <Image
              src={"https:" + url}
              alt={fileName}
              width={details.image.width}
              height={details.image.height}
              layout="intrinsic"
            />
          </Box>
        );
      },
      [BLOCKS.HEADING_1]: (node: ContentNodeText) => {
        const Nodes = node.content.map((contentItem, index) => {
          return (
            <Typography
              variant="h4"
              key={contentItem.value + index}
              {...commonTextStyles}
            >
              {contentItem.value}
            </Typography>
          );
        });

        return Nodes;
      },
      [BLOCKS.HEADING_2]: (node: ContentNodeText) => {
        const Nodes = node.content.map((contentItem, index) => {
          return (
            <Typography
              variant="h5"
              key={contentItem.value + index}
              {...commonTextStyles}
            >
              {contentItem.value}
            </Typography>
          );
        });

        return Nodes;
      },
      [BLOCKS.HEADING_3]: (node: ContentNodeText) => {
        const Nodes = node.content.map((contentItem, index) => {
          return (
            <Typography
              variant="h6"
              key={contentItem.value + index}
              {...commonTextStyles}
            >
              {contentItem.value}
            </Typography>
          );
        });

        return Nodes;
      },
      [BLOCKS.TABLE]: (node: ContentNodeTable) => {
        return (
          <TableContainer
            component={Paper}
            sx={{
              marginTop: "10px",
            }}
          >
            <Table
              sx={{ minWidth: 650, backgroundColor: "#fbfbfb" }}
              size="small"
              aria-label="Awards Table"
            >
              {node.content.map((cell, index) => {
                if (index === 0) {
                  return (
                    <TableHead
                      key={index + cell.content[0].content[0].content[0].value}
                    >
                      <TableRow>
                        {cell.content.map((cell, index) => {
                          let cellValue = cell.content[0].content[0].value;
                          return (
                            <TableCell key={cellValue + index}>
                              {cellValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                  );
                } else {
                  return (
                    <TableBody key={index}>
                      <TableRow>
                        {cell.content.map((cell, index) => {
                          let cellValue = cell.content[0].content[0].value;
                          return (
                            <TableCell key={cellValue + index}>
                              {cellValue}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableBody>
                  );
                }
              })}
            </Table>
          </TableContainer>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: ContentNodeText | ContentNodeHyperlink) => {
        function isHyperlinkNode(
          node: ContentNodeText | ContentNodeHyperlink
        ): node is ContentNodeHyperlink {
          return node.nodeType === "hyperlink";
        }

        return (
          <Typography {...commonTextStyles} fontSize={"16px"}>
            {node.content.map((contentItem: any, index) => {
              if (isHyperlinkNode(contentItem)) {
                const hyperlinkContent = contentItem as ContentNodeHyperlink;

                return (
                  <a
                    href={hyperlinkContent.data.uri}
                    key={index}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {hyperlinkContent.content.map((linkContent, linkIndex) => (
                      <span key={linkIndex}>{linkContent.value}</span>
                    ))}
                  </a>
                );
              }

              if (contentItem.marks.length > 0) {
                return contentItem.marks.map((mark: any) => {
                  switch (mark.type) {
                    case "italic":
                      return (
                        <em key={contentItem.value}>{contentItem.value}</em>
                      );
                    case "bold":
                      return (
                        <strong key={contentItem.value}>
                          {contentItem.value}
                        </strong>
                      );
                    case "superscript":
                      return (
                        <sup key={contentItem.value}>{contentItem.value}</sup>
                      );
                    case "subscript":
                      return (
                        <sub key={contentItem.value}>{contentItem.value}</sub>
                      );
                    case "code":
                      return (
                        <code key={contentItem.value}>{contentItem.value}</code>
                      );
                    case "underline":
                      return <u key={contentItem.value}>{contentItem.value}</u>;

                    default:
                      return (
                        <span key={contentItem.value}>{contentItem.value}</span>
                      );
                  }
                });
              } else {
                return <span key={contentItem.value}>{contentItem.value}</span>;
              }
            })}
          </Typography>
        );
      },
      [BLOCKS.QUOTE]: (node: ContentNodeBlockquote) => {
        return (
          <blockquote
            style={{
              borderLeft: "4px solid gray",
              paddingLeft: "16px",
              marginLeft: "0",
              marginRight: "0",
              color: "#555",
            }}
          >
            {node.content.map((paragraph, index) => (
              <Typography component="p" key={index}>
                {paragraph.content.map((contentItem, itemIndex) => {
                  // Assuming contentItem is of type 'text'
                  return (
                    <Typography key={itemIndex} color="black">
                      {contentItem.value}
                    </Typography>
                  );
                })}
              </Typography>
            ))}
          </blockquote>
        );
      },
    },
  };

  const getDescription = (): string => {
    let description = "";
    blogPost.fields.description.content.map((item: any) => {
      {
        item.content.map((item2: any) => {
          description += item2.value;
        });
      }
    });

    return description;
  };

  return (
    <>
      <Head>
        <title>{blogPost.fields.title}</title>
      </Head>
      <Navbar />
      {blogPost.fields.date && (
        <Headline
          title={blogPost.fields.title}
          description={getDescription()}
          author={blogPost.fields.author}
          day={blogPost.fields.date}
        />
      )}

      <Container
        maxWidth="md"
        style={{
          backgroundColor: "cream",
        }}
      >
        {documentToReactComponents(blogPost.fields.mainContent, options as any)}
      </Container>
      <div style={{ height: "100px" }} />
    </>
  );
}
