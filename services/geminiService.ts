import { GoogleGenAI, Content, Type } from "@google/genai";
import type { AnalysisResult, CadDesigner, TreatmentPlan } from '../types';

// FIX: Correctly initialize GoogleGenAI with a named apiKey parameter.
const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const mockDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getDrLinkResponse(history: Content[], message: string, mode: 'clinical' | 'technical' | 'admin'): Promise<string> {
  console.log("Calling Gemini for Dr. Link response...", { history, message, mode });
  await mockDelay(1500);

  if (mode === 'clinical') {
      if (message.toLowerCase().includes('radiografia')) {
          return "Com base na radiografia, observo uma pequena área radiolúcida na distal do dente 16, sugestiva de cárie. Recomendo uma avaliação clínica para confirmação.";
      }
      return "Para um dente fraturado, as opções incluem: restauração adesiva, faceta, coroa ou, em casos mais graves, extração e implante. A melhor opção depende da extensão da fratura.";
  }
  if (mode === 'technical') {
      return "A zircônia oferece maior resistência e é ideal para posteriores. O E-max (dissilicato de lítio) tem uma estética superior, sendo excelente para anteriores. A escolha depende da necessidade do caso.";
  }
  return "Para otimizar a agenda de amanhã, sugiro agrupar procedimentos similares. Por exemplo, todas as consultas de avaliação pela manhã e restaurações à tarde. Isso pode aumentar a eficiência em até 15%.";
}

export async function getCadFileAnalysis(fileName: string): Promise<AnalysisResult> {
    console.log("Calling Gemini for CAD file analysis...", { fileName });
    await mockDelay(2500);

    const isSuccess = !fileName.toLowerCase().includes('error');
    
    return {
        fileName,
        overallStatus: isSuccess ? 'success' : 'warning',
        results: [
            { check: "Verificação de Malha", status: "success", message: "A malha está íntegra e sem defeitos." },
            { check: "Espessura Mínima", status: "success", message: "Espessura de 0.8mm respeitada em todos os pontos." },
            { check: "Linha de Terminação", status: isSuccess ? "success" : "warning", message: isSuccess ? "Linha de terminação clara e bem definida." : "Linha de terminação irregular na área distal. Recomenda-se revisão." },
            { check: "Pontos de Contato", status: "success", message: "Contatos oclusais e proximais adequados." },
        ]
    };
}

export async function getPatientExplanation(procedure: string): Promise<string> {
    console.log("Calling Gemini for patient explanation...", { procedure });
    await mockDelay(1200);
    
    const explanations: Record<string, string> = {
        "Manutenção Ortodôntica": "A manutenção ortodôntica é uma consulta regular para ajustar seu aparelho. Nela, trocamos os 'elásticos' e ajustamos o fio para garantir que seus dentes continuem se movendo para a posição correta. É um passo importante para o sucesso do seu tratamento!",
        "Avaliação Inicial": "A avaliação inicial é nosso primeiro encontro! Vamos conversar sobre suas queixas, fazer um exame completo da sua boca e, se necessário, pedir alguns exames como radiografias. Com isso, podemos criar um plano de tratamento personalizado para você.",
        "Restauração Dente 24": "Uma restauração, popularmente conhecida como 'obturação', é feita para consertar um dente que foi danificado por uma cárie. Removemos a parte afetada e preenchemos com um material resistente da cor do seu dente, devolvendo a forma e a função dele.",
    };

    return explanations[procedure] || "Este é um procedimento padrão para cuidar da sua saúde bucal. Se tiver dúvidas, pode perguntar!";
}

export async function getDesignerMatch(projectDescription: string): Promise<CadDesigner[]> {
    console.log("Calling Gemini for designer matching...", { projectDescription });
    await mockDelay(3000);

    return [
        { id: 1, name: 'Lucas Mendes', avatarUrl: `https://i.pravatar.cc/150?u=lucas`, rating: 4.9, aiMatchReason: "<b>Combinação Perfeita:</b> Especialista em <b>ExoCAD</b> com mais de 50 projetos de <b>guias cirúrgicos</b> concluídos na plataforma." },
        { id: 2, name: 'Beatriz Costa', avatarUrl: `https://i.pravatar.cc/150?u=beatriz`, rating: 4.8, aiMatchReason: "<b>Excelente Opção:</b> Alta avaliação em projetos de <b>implantes</b> e experiência com casos complexos." },
        { id: 3, name: 'Rafael Martins', avatarUrl: `https://i.pravatar.cc/150?u=rafael`, rating: 4.7, aiMatchReason: "<b>Boa Escolha:</b> Designer versátil com experiência em diversos softwares, incluindo ExoCAD." },
    ];
}

export async function analyzeDentalImage(prompt: string, imageType: string): Promise<string> {
    console.log("Calling Gemini for image analysis...", { prompt, imageType });
    await mockDelay(3000);

    return `
Análise da ${imageType}:
* Observa-se uma imagem radiolúcida na região distal do dente 36, compatível com lesão de cárie profunda, próxima à câmara pulpar.
* Presença de leve reabsorção óssea horizontal na região dos dentes anteriores inferiores.
* O seio maxilar direito apresenta-se velado, o que pode indicar sinusite ou outras alterações. Recomenda-se avaliação com especialista.
Aviso: Esta análise é gerada por IA e não substitui o diagnóstico de um profissional qualificado.
    `;
}

export async function generateTreatmentPlan(prompt: string): Promise<TreatmentPlan> {
    console.log("Calling Gemini for treatment plan generation...", { prompt });
    // This is a mocked call. In a real scenario, we would use the Gemini API.
    await mockDelay(2000);
    
    // Simple mock logic to generate a plan based on keywords
    const items = [];
    let total = 0;
    
    if (prompt.toLowerCase().includes('coroa')) {
        items.push({ description: 'Coroa de Cerâmica', price: 1200 });
        total += 1200;
    }
     if (prompt.toLowerCase().includes('restaura')) {
        items.push({ description: 'Restauração em Resina', price: 350 });
        total += 350;
    }
    if (prompt.toLowerCase().includes('clareamento')) {
        items.push({ description: 'Clareamento Dental a Laser', price: 800 });
        total += 800;
    }
     if (items.length === 0) {
        items.push({ description: 'Consulta de Avaliação', price: 150 });
        total += 150;
    }
    
    return {
        id: `TP-${Date.now()}`,
        items,
        total,
        status: 'Proposed',
    };
}


export async function getIntegratedChatResponse(context: any, message: string): Promise<string> {
    console.log("Calling Gemini for integrated chat response...", { context, message });
    await mockDelay(1000);
    if (context.email) { // is patient
        return "Entendi, Doutora. Vou seguir suas recomendações. A sensibilidade já melhorou um pouco hoje. Obrigado!";
    }
    return "Verifiquei aqui. Conseguimos sim adiantar a produção. A coroa estará pronta para entrega amanhã ao final do dia. Ajuda?";
}