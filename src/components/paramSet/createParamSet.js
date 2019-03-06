import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactJson from 'react-json-view';
import Button from '@material-ui/core/Button';
import CreateParamSetForm from './createParamSetForm';
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  jsonView: {
    '& span': { wordWrap: 'break-word' },
    '& .variable-value': { maxWidth: '100%' },
    '& .variable-value>div': { width: '100%' },
  },
  majorButton: { float: 'right', margin: 20 },
  title1Div: {
    width: '100%',
    display: 'inline-block',
  },
  title1: {
    float: 'left',
    fontWeight: 'bold',
  },
  title2: {
    fontWeight: 'bold',
  },
  or: {
    float: 'left',
    marginLeft: 100,
  },
  formsDiv: { display: 'inline-block' },
  divider1: { width: 290 },
  divider2: { marginBottom: 30, marginTop: 10 },
});

class CreateParamSet extends React.Component {
  state = {
    activeStep: 0,
    editMode: false,
    textEditorData: '',
    itemsToBeCreated: [
      {
        label: '',
        definition: [{ key: '', value: '' }],
        usages: [''],
      },
    ],
  };

  resetItemsToBeCreated = () => {
    const defaultData = [
      {
        label: '',
        definition: [{ key: '', value: '' }],
        usages: [''],
      },
    ];
    this.setState(() => ({
      editMode: false,
      itemsToBeCreated: defaultData,
    }));
  };

  onEditorChange = (event) => {
    let newData = event.target.value;
    this.setState(() => ({
      textEditorData: newData,
    }));
  };

  onReactJsonClick = (event) => {
    if (
      !this.state.editMode &&
      (event.target.firstChild && event.target.firstChild.nodeType != Node.TEXT_NODE) &&
      event.target.className !== 'object-key'
    ) {
      this.setState(() => ({
        editMode: true,
        textEditorData: JSON.stringify(this.cleanItemsToBeCreated(), null, '  '),
      }));
    }
  };

  saveTextEditorData = () => {
    let parsedData;
    try {
      parsedData = JSON.parse(this.state.textEditorData);
      parsedData.forEach((item) => {
        if (!item.label) {
          item.label = '';
        }
        if (!item.definition) {
          item.definition = [];
        }
        if (!item.usages) {
          item.usages = [];
        }
        return item;
      });
      if (
        !parsedData.every(
          (item) =>
            typeof item.label === 'string' &&
            typeof item.definition === 'object' &&
            typeof item.usages === 'object' &&
            (item.usages.length === 0 || item.usages.every((usage) => typeof usage === 'string')) &&
            (item.definition.length > 0 ||
              item.definition.every((usage) => typeof definition === 'object')),
        )
      ) {
        throw new Error();
      }
      this.setState(() => ({
        collapseAllForm: true,
        editMode: false,
        itemsToBeCreated: parsedData,
      }));
    } catch (error) {
      alert(`Invalid JSON:${error}`);
    }
  };

  cleanItemsToBeCreated = () => {
    return this.state.itemsToBeCreated.map((item) => ({
      ...item,
      usages: item.usages.filter((usage) => usage.trim() !== ''),
      definition: item.definition.filter(
        (def) => def.key.toString().trim() !== '' && def.value.toString().trim() !== '',
      ),
    }));
  };

  updateItemsToBeCreated = (index, data) => {
    if (!data) {
      this.state.itemsToBeCreated.splice(0, 1);
    } else {
      this.state.itemsToBeCreated[index] = data;
    }
    this.setState(() => ({
      itemsToBeCreated: this.state.itemsToBeCreated,
    }));
  };

  addNewParamSet = () => {
    this.setState(() => ({
      itemsToBeCreated: [
        ...this.state.itemsToBeCreated,
        {
          label: '',
          definition: [{ key: '', value: '' }],
          usages: [''],
        },
      ],
    }));
  };

  setCollapse = (value) => {
    this.setState(() => ({
      collapseAllForm: false,
    }));
  };

  cancelEdit = () => {
    this.setState(() => ({
      editMode: false,
    }));
  };

  render() {
    const { classes } = this.props;
    const { itemsToBeCreated, editMode, collapseAllForm, textEditorData } = this.state;
    try {
      if (this.props.location.state.data) {
        const tempData = this.props.location.state.data;
        this.setState(() => ({
          itemsToBeCreated: tempData,
        }));
        this.props.location.state.data = null;
        this.props.history.replace('/createParamSet', {});
      }
    } catch (err) {}

    return (
      <Grid container spacing={24}>
        <Grid item xs={7}>
          <div className={classes.title1Div}>
            <Typography variant="h6" className={classes.title1}>
              Create Parameter Sets by Form
            </Typography>
            <Typography variant="h6" className={classes.or}>
              Or
            </Typography>
          </div>
          <Divider className={classes.divider1} />
          <div className={classes.formsDiv}>
            {itemsToBeCreated.map((item, index) => (
              <CreateParamSetForm
                key={index}
                index={index}
                data={item}
                collapse={collapseAllForm}
                setCollapse={this.setCollapse}
                isLast={index === itemsToBeCreated.length - 1}
                addNewParamSet={this.addNewParamSet}
                itemsToBeCreated={this.state.itemsToBeCreated}
                updateItemsToBeCreated={this.updateItemsToBeCreated}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={5}>
          <Typography variant="h6" className={classes.title2}>
            Edit the JSON or drag/drop a file here to create
          </Typography>
          <Divider className={classes.divider2} />
          {editMode ? (
            <TextField
              label="Type or paste JSON here"
              onChange={this.onEditorChange}
              style={{ margin: 8 }}
              fullWidth
              multiline={true}
              rows={25}
              rowsMax={4}
              margin="normal"
              variant="filled"
              value={textEditorData}
              InputLabelProps={{
                shrink: true,
              }}
            />
          ) : (
            <div onClick={this.onReactJsonClick} className={classes.jsonView}>
              <ReactJson
                src={this.cleanItemsToBeCreated()}
                theme="monokai"
                style={{
                  fontSize: 14,
                  minHeight: 500,
                  padding: 20,
                }}
              />
            </div>
          )}
          {editMode ? (
            <div>
              <Button
                className={classes.majorButton}
                color="primary"
                variant="contained"
                onClick={this.saveTextEditorData}
              >
                Save
              </Button>
              <Button onClick={this.cancelEdit} className={classes.majorButton}>
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <Button
                className={classes.majorButton}
                color="primary"
                variant="contained"
                disabled={editMode === true}
              >
                Submit
              </Button>

              <Button onClick={this.resetItemsToBeCreated} className={classes.majorButton}>
                Reset
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    );
  }
}

CreateParamSet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateParamSet);
