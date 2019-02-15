from flask import Flask
import educacao as edu, json, numpy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/aluno/cod/<int:cod_aluno>', methods=['GET', 'POST'])
def dados_aluno(cod_aluno):
    aluno_row = edu.obter_aluno_row(cod_aluno)
    if aluno_row is None:
        return ''
    
    proba = edu.probabilidade_evasao(aluno_row)

    dados_aluno = edu.obter_dados_aluno(cod_aluno)
    print(proba)
    dados_aluno['PROBABILIDADE'] = int(proba*100)
    return json.dumps(dados_aluno, default=default)


@app.route('/aluno/index/<int:index>', methods=['GET', 'POST'])
def dados_aluno_por_index(index):
    aluno_row = edu.obter_aluno_row_por_index(index)
    if aluno_row is None:
        return ''
    
    proba = edu.probabilidade_evasao(aluno_row)

    dados_aluno = edu.obter_dados_aluno(aluno_row['CD_ALUNO'])
    print(proba)
    dados_aluno['PROBABILIDADE'] = int(proba*100)
    return json.dumps(dados_aluno, default=default)

@app.route('/estados/proba', methods=['GET', 'POST'])
def listar_estados_proba():
    estados_proba = edu.obter_municipios_proba()
    
    return json.dumps(estados_proba, default=default)

@app.route('/estados', methods=['GET', 'POST'])
def listar_estados():
    estados = edu.get_municipios()
    return json.dumps(estados, default=default)

def default(o):
    if isinstance(o, numpy.int64): 
        return int(o)  
    elif isinstance(o, numpy.float64): 
        return float(o)  
    else:
        return ''
    

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)