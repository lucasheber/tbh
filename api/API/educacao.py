import pandas as pd
import xgboost as xgb
import pickle
import numpy as np


model = None
encoder_municipio = None
df_alunos = None
df_alunos_all = None
cols_para_proba = None
dict_raca = None
path = 'PROCESSAMENTO_DADOS/'

def probabilidade_evasao(aluno_row):
    ''' dados_aluno: Pode ser um DataFrame ou uma Serie '''
    
    if isinstance(aluno_row, pd.Series):
        aluno_row = pd.DataFrame([aluno_row.values], columns=aluno_row.index)
        
    aluno_novo = transform(aluno_row)
    aluno_novo = aluno_novo[cols_para_proba]
    pred = model.predict_proba(aluno_novo)
    
    if len(pred) == 1:
        return pred[0][1]
    else:
        return [x[1] for x in pred]

def transform(df):
    df2 = df.copy()
    df2['UF_MUN_NASC'] = encoder_municipio.transform(df2['UF_MUN_NASC'])
    return df2
    
def obter_aluno_row(cod_aluno):
    try:
        alunos = df_alunos_all[df_alunos_all['CD_ALUNO'] == cod_aluno]
        return alunos.iloc[0]
    except:
        None


def obter_aluno_row_por_index(index_aluno):
    try:
        return df_alunos_all.iloc[index_aluno]
    except:
        return None
        
def remover_da_lista(lista, lista_el):
    for e in lista_el:
        try: lista.remove(e)
        except: pass
    
    return lista
        
def get_municipios():
    estados = df_alunos_all['UF_MUN_NASC'].unique()
    estados = list(estados)
    estados = remover_da_lista(estados, ['  ', ' ', 'CA', 'BU'])
    return estados
    
    
def obter_municipios_proba():
    groups = df_alunos_all.groupby(['UF_MUN_NASC']).groups
    estados = get_municipios()
    proba_estados = []
    
    for estado in estados:
        indexs = groups[estado]
        df_estado = df_alunos_all.loc[indexs]
        df_estado['proba'] = probabilidade_evasao(df_estado)
        #df_estado = df_estado[df_estado['proba'] > 0.3]
        proba_estado = np.array(probabilidade_evasao(df_estado)).mean()
        proba_estados.append([estado, int(proba_estado*100)])
        
    proba_estados.sort(key=lambda x: x[1], reverse=True)
    return proba_estados
        
def obter_dados_aluno(cod_aluno):
    aluno = obter_aluno_row(cod_aluno)
    if aluno is not None:
        aluno = dict(aluno)
        aluno['CORRACA'] = dict_raca[aluno['CORRACA']]
        return aluno

    return None
    

def _inicializar():
    global encoder_municipio, model, df_alunos, df_alunos_all, cols_para_proba, dict_raca
    
    with open(path+'xgboost', 'rb') as f:
        model = pickle.load(f)
        
    with open(path+'encoder_municipio', 'rb') as f:
        encoder_municipio = pickle.load(f)
        
    df_alunos = pd.read_csv(path+'dados_alunos.csv')
    df_alunos_all = pd.read_csv(path+'dados_alunos_all.csv')
    cols_para_proba = ['SEXO', 'FLAG_BOLSA_FAM', 'UF_MUN_NASC', 'CORRACA', 'END_ZONA', 'PRONATEC']
    
    dict_raca = {
        1: 'Branca',
        2: 'Preta',
        3: 'Parda',
        4: 'Amarela',
        5: 'Indigena',
        6: 'Nao Declarada'
    }
        
_inicializar()