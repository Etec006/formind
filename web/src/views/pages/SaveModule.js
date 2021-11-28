import { useCallback, useEffect, useRef, useState } from 'react';

import {
  Button, Card, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon,
  InputGroupText, Row,
} from 'reactstrap';

import ReactMarkdown from 'react-markdown';
import '../../assets/css/styles-design-system.css';
import api from '../../services/api';
import { getUploadUrl } from '../../utils';
import { useHistory } from 'react-router-dom';
import Layout from '../../components/Layout';

const initialModuleState = {
  name: '',
  subject: '',
  description: '',
  concept: '',
  image: null,
};

const initialSessionForm = [
  {
    id: null,
    name: '',
    content: '',
    image: null,
    previewImage: null,
  },
];

const SaveModule = props => {
  let moduleId = props.match.params.id;
  const history = useHistory();
  const inputFilesRef = useRef(null);

  const [module, setModule] = useState({});
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState(initialModuleState);
  const [sessions, setSessions] = useState(initialSessionForm);
  const [previewImage, setPreviewImage] = useState('');

  const onChangeInput = useCallback(event => {
    let { name, value, type } = event.target;

    if (type === 'file') {
      value = event.target.files[0];
      setPreviewImage(URL.createObjectURL(value));
    }

    setFormData(formData => ({
      ...formData,
      [name]: value,
    }));
  }, []);

  const onChangeSessionInput = useCallback((event, inputName, sessionIndex) => {
    let { value, type } = event.target;

    if (type === 'file') {
      value = event.target.files[0];
    }

    setSessions(oldSessions => {
      const cloneSessions = [...oldSessions];
      cloneSessions[sessionIndex][inputName] = value;

      if (type === 'file') {
        cloneSessions[sessionIndex]['previewImage'] =
          URL.createObjectURL(value);
      }

      return cloneSessions;
    });
  }, []);

  const handleSaveModule = useCallback(async () => {
    const form = new FormData();

    form.append('name', formData.name);
    form.append('subject', formData.subject);
    form.append('description', formData.description);
    form.append('concept', formData.concept);
    form.append('image', formData.image);

    const url = moduleId ? `/module/${moduleId}` : '/module';
    const method = moduleId ? 'put' : 'post';

    const responseNewModule = await api[method](url, form);
    const sendModuleIdToApi = responseNewModule.data.id ?? moduleId;

    await Promise.all(
      sessions.map(async session => {
        const formDataSession = new FormData();

        formDataSession.append('name', session.name);
        formDataSession.append('module', sendModuleIdToApi);
        formDataSession.append('content', session.content);
        formDataSession.append('thumbnail', session.image);

        if (session?.id) {
          await api.put(`/session/${session.id}`, formDataSession);
        } else {
          await api.post('/session', formDataSession);
        }
      }),
    );

    alert('Módulo salvo com sucesso!');

    if (!moduleId) {
      history.push(`/modulo/${sendModuleIdToApi}`);
    }
  }, [formData, moduleId, sessions, history]);

  const onAddSession = useCallback(() => {
    setSessions(oldSession => [...oldSession, initialSessionForm[0]]);
  }, []);

  const onRemoveSession = useCallback(async (removedIndex, sessionId) => {
    setSessions(oldSession =>
      oldSession.filter((_, actualIndex) => actualIndex !== removedIndex),
    );

    if (sessionId) {
      await api.delete(`/session/${sessionId}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (!moduleId) {
        return;
      }

      const response = await api.get(`/module/${moduleId}`);
      setModule(response.data.module);
    })();
  }, [moduleId]);

  useEffect(() => {
    (async () => {
      const response = await api.get(`/subjects`);
      setSubjects(response.data);
    })();
  }, [moduleId]);

  useEffect(() => {
    if (!module?.id) {
      return;
    }

    setFormData({
      name: module.name,
      subject: module.subject.id,
      concept: module.concept,
      description: module.description,
      image: null,
    });

    if (module?.image?.key) {
      setPreviewImage(getUploadUrl(module?.image?.key));
    }

    if (module?.sessions) {
      setSessions(
        module.sessions.map(session => ({
          id: session.id,
          name: session.name,
          content: session.content,
          image: null,
          previewImage: getUploadUrl(session.thumbnail?.key),
        })),
      );
    }
  }, [module]);

  return (
    <Layout>
      <Container>
        <Card className="card-profile shadow mt--300">
          <Row className="row-grid row py-5 px-3">
            <Col class="pl-lg-3 pr-lg-3 inlineblockdiv" lg="6">
              <FormGroup>
                <Input
                  className="font-weight-700"
                  placeholder="Selecione um assunto"
                  type="select"
                  value={formData.subject}
                  name="subject"
                  onChange={onChangeInput}
                >
                  {subjects.map(row => (
                    <option value={row.id}>
                      {row.name} - {row.area.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative input-module">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-zoom-split-in" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Input
                    className="font-weight-700"
                    placeholder="Nome do Módulo"
                    type="text"
                    value={formData.name}
                    name="name"
                    onChange={onChangeInput}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative input-module description-module">
                  <InputGroupAddon addonType="prepend" />

                  <Input
                    className="pl-lg-3 font-weight-700"
                    placeholder="Descrição do Módulo"
                    type="text"
                    value={formData.concept}
                    name="concept"
                    onChange={onChangeInput}
                  />
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative input-module description-module">
                  <InputGroupAddon addonType="prepend" />

                  <Input
                    className="pl-lg-3 font-weight-700"
                    placeholder="Conceito do Módulo"
                    type="textarea"
                    value={formData.description}
                    name="description"
                    onChange={onChangeInput}
                    rows={6}
                  />
                </InputGroup>
              </FormGroup>
            </Col>

            <Col class="pl-lg-3 inlineblockdiv" lg="6">
              <div className="pl-lg-4 pt-lg-2">
                <img src={previewImage} className="img-fluid" />
              </div>

              <Row>
                <input
                  className="alignbutton-center inputhiden"
                  ref={inputFilesRef}
                  type="file"
                  name="image"
                  onChange={onChangeInput}
                />

                <Button
                  className="btn-icon btn-3 alignbutton-center"
                  color="gray"
                  type="button"
                  onClick={() => inputFilesRef?.current?.click()}
                >
                      <span className="btn-inner--text">
                        Fazer upload da imagem
                      </span>
                </Button>
              </Row>
            </Col>
          </Row>

          {sessions.map((row, index) => (
            <Row className="p-3 border-top border-bottom">
              <Col md={12}>
                <Button
                  color="gray"
                  type="button"
                  onClick={() => onRemoveSession(index, row.id)}
                >
                  Remover sessão
                </Button>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Input
                    className="font-weight-700"
                    placeholder="Nome da sessão"
                    value={row.name}
                    onChange={event =>
                      onChangeSessionInput(event, 'name', index)
                    }
                  />
                </FormGroup>
              </Col>

              <Col md={12} className="mb-2">
                <Input
                  className="font-weight-700"
                  type="file"
                  onChange={event =>
                    onChangeSessionInput(event, 'image', index)
                  }
                />

                {row.previewImage}
              </Col>

              <Col md={12} className="row-grid markdown-align ">
                <Input
                  type="textarea"
                  value={row.content}
                  rows={10}
                  onChange={event =>
                    onChangeSessionInput(event, 'content', index)
                  }
                />

                <ReactMarkdown
                  children={row.content}
                  className="markdown text-darkerer"
                />
              </Col>
            </Row>
          ))}

          <Row>
            <div className="p-4">
              <Button
                className="btn-icon btn-3 mt-lg-4 alignbutton-center"
                color="gray"
                type="button"
                onClick={() => onAddSession()}
              >
                <div className="text-darker">
                  <i class="fa fa-plus" aria-hidden="true"></i>

                  <span className="btn-inner--text text-darker">
                        Adicionar Nova sessão
                      </span>
                </div>
              </Button>
            </div>
          </Row>

          <Row className="border-top">
            <Button color="gray" type="button" onClick={handleSaveModule}>
              Salvar modulo
            </Button>
          </Row>
        </Card>
      </Container>
    </Layout>
  );
};

export default SaveModule;
