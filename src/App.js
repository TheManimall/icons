import FormikSelect from './components/modules/form/select/formik-select'

const options = [
  {
    value: 'aaa',
    text: 'aaa',
  },
  {
    value: 'bbb',
    text: 'bbb',
  },
  {
    value: 'ccc',
    text: 'ccc',
  },
  {
    value: 'ddd',
    text: 'ddd'
  }
]

function App() {
  const handelChange = (value) => {
    console.log('value', value)
  }
  const handleBlur = () => {}
  return (
    <FormikSelect  ariaLabel="My test aria label" options={options} handleChange={handelChange} handleBlur={handleBlur}/>
  );
}

export default App;
