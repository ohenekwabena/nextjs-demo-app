import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://media.istockphoto.com/id/1250380933/photo/top-down-aerial-view-of-chicago-downtown-urban-grid-with-park.jpg?s=612x612&w=0&k=20&c=ojXCwviHjJCOgvWU-JUM0_AC6hsaI9UfzzhzvDLJkIU=",
//     address: "William Tubman, 10",
//     description: "This is the first meetup ever!",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://media.istockphoto.com/id/1250380933/photo/top-down-aerial-view-of-chicago-downtown-urban-grid-with-park.jpg?s=612x612&w=0&k=20&c=ojXCwviHjJCOgvWU-JUM0_AC6hsaI9UfzzhzvDLJkIU=",
//     address: "William Tubman, 10",
//     description: "This is the second meetup ever!",
//   },
//   {
//     id: "m1",
//     title: "A Third Meetup",
//     image:
//       "https://media.istockphoto.com/id/1250380933/photo/top-down-aerial-view-of-chicago-downtown-urban-grid-with-park.jpg?s=612x612&w=0&k=20&c=ojXCwviHjJCOgvWU-JUM0_AC6hsaI9UfzzhzvDLJkIU=",
//     address: "William Tubman, 10",
//     description: "This is the third meetup ever!",
//   },
// ];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://nextUser:Dq3UE6pUCJQhoj39@nextjscluster.erlt2eo.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
