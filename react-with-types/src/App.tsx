import { CoursePart } from "./types";
import { assertNever } from "./utils";

interface HeaderProps {
  title: string;
}

interface PartProps {
  courseParts: CoursePart[]
};

interface TotalProps {
  total: number
}

const Header = (props: HeaderProps) => {
  return <h1>{props.title}</h1>
}

const Content = (props: PartProps) => {
  return props.courseParts.map((p, i) => {
    let partInfo;
    switch(p.kind) {
      case 'basic':
        partInfo = <><i>{p.description}</i></>
        break;
      case 'group':
        partInfo = <>project exercises: {p.groupProjectCount}</>;
        break;
      case 'background':
        partInfo = <><p>{p.description}</p><p>{p.backgroundMaterial}</p></>;
        break;
      case 'special':
        partInfo = <><p>{p.description}</p><p>requirements: {p.requirements.join(',')}</p></>;
        break;
      default:
        assertNever(p);
    }
    return <div key={i}><h1>{p.name} {p.exerciseCount}</h1>{partInfo}<br /></div>;
  }
  )
}

const Total = (props: TotalProps) => {
  return <p>
  Number of exercises {props.total}
</p>
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ]

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header title={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;