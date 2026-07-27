import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projetos",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) =>
        rule.required().min(2).error("Informe o título do projeto."),
    }),

    defineField({
      name: "slug",
      title: "Endereço do projeto",
      description:
        "Clique em Generate para criar o endereço com base no título.",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) =>
        rule.required().error("Gere o endereço do projeto."),
    }),

    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          {
            title: "Automotivo",
            value: "automotive",
          },
          {
            title: "Lifestyle",
            value: "lifestyle",
          },
          {
            title: "Produto",
            value: "product",
          },
          {
            title: "Retrato",
            value: "portrait",
          },
          {
            title: "Projeto pessoal",
            value: "personal",
          },
        ],
        layout: "dropdown",
      },
      validation: (rule) =>
        rule.required().error("Selecione uma categoria."),
    }),

    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      validation: (rule) =>
        rule
          .required()
          .integer()
          .min(2000)
          .max(new Date().getFullYear() + 1),
    }),

    defineField({
      name: "client",
      title: "Cliente",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Descrição",
      description:
        "Escreva uma descrição curta sobre o projeto. Não coloque os créditos aqui.",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "services",
      title: "Serviços realizados",
      description:
        "Exemplo: Retouching, Compositing e Color Grading.",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      options: {
        layout: "tags",
      },
    }),

    defineField({
      name: "credits",
      title: "Créditos",
      description:
        "Adicione os profissionais e as responsabilidades do projeto.",
      type: "array",
      of: [
        defineArrayMember({
          name: "credit",
          title: "Crédito",
          type: "object",
          fields: [
            defineField({
              name: "role",
              title: "Função",
              description: "Exemplo: Photography.",
              type: "string",
              validation: (rule) =>
                rule.required().error("Informe a função."),
            }),

            defineField({
              name: "name",
              title: "Nome",
              description: "Exemplo: Chris de Lorenzo.",
              type: "string",
              validation: (rule) =>
                rule.required().error("Informe o nome."),
            }),
          ],

          preview: {
            select: {
              title: "role",
              subtitle: "name",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "coverImage",
      title: "Imagem principal",
      description:
        "Esta imagem será usada como capa do projeto e como primeira imagem da página.",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da imagem",
          description:
            "Descreva brevemente o conteúdo da imagem para acessibilidade.",
          type: "string",
          validation: (rule) =>
            rule.required().error("Informe a descrição da imagem."),
        }),
      ],
      validation: (rule) =>
        rule.required().error("Adicione uma imagem principal."),
    }),

    defineField({
      name: "gallery",
      title: "Galeria",
      description:
        "Arraste as imagens para alterar a ordem de exibição.",
      type: "array",
      of: [
        defineArrayMember({
          name: "galleryImage",
          title: "Imagem",
          type: "image",
          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .error("Informe a descrição da imagem."),
            }),

            defineField({
              name: "layout",
              title: "Layout da imagem",
              description:
                "Escolha como esta imagem será apresentada na página.",
              type: "string",
              initialValue: "full",
              options: {
                list: [
                  {
                    title: "Largura total",
                    value: "full",
                  },
                  {
                    title: "Horizontal central",
                    value: "centered",
                  },
                  {
                    title: "Vertical à esquerda",
                    value: "portraitLeft",
                  },
                  {
                    title: "Vertical à direita",
                    value: "portraitRight",
                  },
                  {
                    title: "Duas colunas",
                    value: "half",
                  },
                ],
                layout: "dropdown",
              },
            }),
          ],
        }),
      ],

      validation: (rule) =>
        rule.min(1).error("Adicione pelo menos uma imagem."),
    }),

    defineField({
      name: "beforeAfter",
      title: "Antes e depois",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },

      fields: [
        defineField({
          name: "before",
          title: "Antes",
          type: "image",
          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem",
              type: "string",
            }),
          ],
        }),

        defineField({
          name: "after",
          title: "Depois",
          type: "image",
          options: {
            hotspot: true,
          },

          fields: [
            defineField({
              name: "alt",
              title: "Descrição da imagem",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "featured",
      title: "Destacar na página inicial",
      description:
        "Ative para exibir este projeto entre os principais destaques.",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "order",
      title: "Ordem de exibição",
      description:
        "Projetos com números menores aparecem primeiro.",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.integer().min(0),
    }),
  ],

  orderings: [
    {
      title: "Ordem definida",
      name: "manualOrder",
      by: [
        {
          field: "order",
          direction: "asc",
        },
        {
          field: "year",
          direction: "desc",
        },
      ],
    },

    {
      title: "Mais recentes",
      name: "yearDescending",
      by: [
        {
          field: "year",
          direction: "desc",
        },
      ],
    },
  ],

  preview: {
    select: {
      title: "title",
      client: "client",
      category: "category",
      year: "year",
      media: "coverImage",
    },

    prepare({
      title,
      client,
      category,
      year,
      media,
    }) {
      const subtitle = [client, category, year]
        .filter(Boolean)
        .join(" · ");

      return {
        title,
        subtitle,
        media,
      };
    },
  },
});