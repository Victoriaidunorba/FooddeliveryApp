export default {
  name: 'resturant',
  title: 'Resturant',
  type: 'document',
  fields: [
    {
      name: 'name', 
      title: 'Resturant name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description', 
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image', 
      title: 'Image of the Resturant',
      type: 'image',
    },
    {
      name: 'lat', 
      title: 'Latitude of the Resturant',
      type: 'number',
    },
    {
      name: 'long', 
      title: 'Longitude of the Resturant',
      type: 'number',
    },
    {
      name: 'address', 
      title: 'Resturant address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating', 
      title: 'Enter a Rating from (1-5 Stars)',
      type: 'number',
      validation: (Rule) => 
      Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a value betwen 1 and 5")
      ,
    },
    {
      name: "type",
      type: "string",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{ type: "category" }],
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
 
  ],

  
}

