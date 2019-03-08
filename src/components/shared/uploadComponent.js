import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    majorButton: {
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      marginBottom: 15,
    }
  });

class UploadComponent extends React.Component {
    state = {
        files: [],
    };

    handleChange = (acceptedFiles) => {
        console.log(acceptedFiles)
        };
  
    render() {
        const { classes } = this.props;

        const dropzoneStyle = {
            backgroundColor: 'white',
            opacity: '100%',
        };

        const activeDropzoneStyle = {
            backgroundColor: 'black',
            opacity: '50%',
        };

        return (
            <Dropzone 
                onDrop={acceptedFiles => this.handleChange(acceptedFiles)}
                style={dropzoneStyle}
                activeStyle={activeDropzoneStyle}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button className={classes.majorButton} color="primary" variant="contained">
                        Drag and drop your file or click to browse
                    </Button>
                </div>
                </section>
            )}
            </Dropzone>
          )
    }
}

UploadComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(UploadComponent);

